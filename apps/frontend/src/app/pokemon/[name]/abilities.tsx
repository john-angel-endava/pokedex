import { PokemonAbility } from '@/types/data-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface PokemonAbilityProps {
  abilities: PokemonAbility[];
}

export default function PokemonAbilitiesPage({ abilities }: PokemonAbilityProps) {
  return (
    <Stack direction="row" spacing={1} justifyContent="left">
      <Typography variant="body1">Abilities:</Typography>
      {abilities?.map((abilityInfo) => (
        <Typography variant="body1" key={abilityInfo.ability.name}>
          {abilityInfo.ability.name}
        </Typography>
      ))}
    </Stack>
  );
}