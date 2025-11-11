import { Stack, Typography } from "@mui/material";
import { PokemonStat } from "@/types/data-types";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

export default function PokemonStatsPage({ stats }: PokemonStatsProps) {
  return (
    <Stack
      direction="column"
      spacing={1}
      justifyContent="start"
      alignItems="left"
    >
      <Typography variant="subtitle1" textAlign={"left"}>
        Stats:
      </Typography>
      <Stack direction={"row"} spacing={2}>
        {stats.map((statInfo) => (
          <Stack
            key={statInfo.stat.name}
            direction={"column"}
            spacing={1}
            alignItems={"center"}
          >
            <Typography variant="body1" style={{ textTransform: "capitalize" }}>
              {statInfo.stat.name}
            </Typography>
            <Typography variant="body1">{statInfo.base_stat}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}