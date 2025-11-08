import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly svc: PokemonService) {}

  // GET /pokemon?offset=0&limit=12
  @Get()
  list(@Query('offset') offset = 0, @Query('limit') limit = 12) {
    return this.svc.list(offset, limit);
  }

  // GET /pokemon/:name  (e.g., pikachu)
  @Get(':name')
  detail(@Param('name') name: string) {
    return this.svc.detail(name);
  }
}
