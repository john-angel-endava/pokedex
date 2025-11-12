import { HttpService } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';
import { PokemonDetail, PokemonPagination } from './pokemon.types';

describe('PokemonService', () => {
  type HttpServiceGetMock = jest.Mock<
    Promise<{ status: number; data: any }>,
    [string, any?]
  >;
  type HttpServiceMock = {
    axiosRef: { get: HttpServiceGetMock };
  };
  let http: HttpServiceMock;
  let service: PokemonService;

  beforeEach(() => {
    http = { axiosRef: { get: jest.fn() as HttpServiceGetMock } };
    service = new PokemonService(http as unknown as HttpService);
    jest.spyOn(console, 'error').mockImplementation(() => {}); // silence error logs in test output
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('detail', () => {
    it('returns details on 200', async () => {
      const axiosData = {
        id: 25,
        name: 'pikachu',
        abilities: [
          { is_hidden: false, slot: 1, ability: { name: 'static', url: 'x' } },
        ],
        height: 4,
        weight: 60,
        sprites: {
          front_default: 'sprite-url',
          other: {
            'official-artwork': {
              front_default: 'official-artwork-url',
            },
          },
        },
        stats: [
          { stat: { name: 'speed', url: 'x' }, effort: 0, base_stat: 90 },
        ],
        types: [{ slot: 1, type: { name: 'electric', url: 'x' } }],
      };

      http.axiosRef.get.mockResolvedValue({ status: 200, data: axiosData });

      const result = await service.detail('pikachu');
      expect(http.axiosRef.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu',
      );
      expect(result).toEqual(axiosData);
    });

    it('throws NotFoundException on 404', async () => {
      http.axiosRef.get.mockResolvedValue({ status: 404, data: {} });
      await expect(service.detail('missingno')).rejects.toThrow(
        /Pokémon missingno not found/i,
      );
    });

    it('throws Error on non 200/404', async () => {
      http.axiosRef.get.mockResolvedValue({ status: 500, data: {} });

      await expect(service.detail('pikachu')).rejects.toThrow(
        /Error fetching Pokémon pikachu details/i,
      );
    });

    it('coerces sprites.front_default to null when absent', async () => {
      const axiosData = {
        id: 1,
        name: 'bulbasaur',
        abilities: [],
        height: 7,
        weight: 69,
        sprites: {}, // missing front_default
        stats: [],
        types: [],
      };

      http.axiosRef.get.mockResolvedValue({ status: 200, data: axiosData });

      const result = await service.detail('bulbasaur');
      expect(result.sprites.front_default).toBeNull();
    });
  });

  describe('list', () => {
    it('returns empty list when on non 200', async () => {
      http.axiosRef.get.mockResolvedValueOnce({ status: 503, data: {} });

      const result = await service.list(0, 12);
      expect(http.axiosRef.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon',
        { params: { offset: 0, limit: 12 } },
      );
      expect(result).toEqual({
        count: 0,
        next: null,
        previous: null,
        pokemons: [],
      });
    });

    it('fetches pagination and calls detail for each result', async () => {
      const pagination: PokemonPagination = {
        count: 2,
        next: 'next-url',
        previous: null,
        results: [
          { name: 'pikachu', url: 'u1' },
          { name: 'bulbasaur', url: 'u2' },
        ],
      };
      http.axiosRef.get.mockResolvedValueOnce({
        status: 200,
        data: pagination,
      });
      const pikachu: PokemonDetail = {
        id: 25,
        name: 'pikachu',
        abilities: [],
        height: 4,
        weight: 60,
        sprites: { front_default: 'sprite1' },
        stats: [],
        types: [],
      };
      const bulbasaur: PokemonDetail = {
        id: 1,
        name: 'bulbasaur',
        abilities: [],
        height: 7,
        weight: 69,
        sprites: { front_default: 'sprite2' },
        stats: [],
        types: [],
      };

      const detailSpy = jest
        .spyOn(service, 'detail')
        .mockResolvedValueOnce(pikachu)
        .mockResolvedValueOnce(bulbasaur);

      const result = await service.list(0, 2);

      expect(http.axiosRef.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon',
        { params: { offset: 0, limit: 2 } },
      );
      expect(detailSpy).toHaveBeenCalledTimes(2);
      expect(detailSpy).toHaveBeenNthCalledWith(1, 'pikachu');
      expect(detailSpy).toHaveBeenNthCalledWith(2, 'bulbasaur');

      expect(result).toEqual({
        count: 2,
        next: 'next-url',
        previous: null,
        pokemons: [pikachu, bulbasaur],
      });
    });

    it('continues when a detail fetch fails and logs the error', async () => {
      const pagination: PokemonPagination = {
        count: 2,
        next: null,
        previous: null,
        results: [
          { name: 'missingno', url: 'u1' },
          { name: 'pikachu', url: 'u2' },
        ],
      };
      http.axiosRef.get.mockResolvedValueOnce({
        status: 200,
        data: pagination,
      });

      const detailSpy = jest
        .spyOn(service, 'detail')
        .mockRejectedValueOnce(new Error('Error fetching Pokémon missingno'))
        .mockResolvedValueOnce({
          id: 25,
          name: 'pikachu',
          abilities: [],
          height: 4,
          weight: 60,
          sprites: { front_default: 'sprite' },
          stats: [],
          types: [],
        } as PokemonDetail);

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = await service.list(0, 2);

      expect(detailSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalled();
      expect(result.pokemons).toHaveLength(1);
      expect(result.pokemons[0].name).toBe('pikachu');
      expect(result.count).toBe(2);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
    });
  });
});
