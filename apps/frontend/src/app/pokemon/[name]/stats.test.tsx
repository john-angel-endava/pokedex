import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonStatsPage from "./stats";
import { PokemonStat } from "@/types/data-types";

describe('PokemonStatsPage', () => {
  const sampleStats: PokemonStat[] = [
    { base_stat: 45, effort: 0, stat: { name: 'hp', url: '' }},
    { base_stat: 49, effort: 0, stat: { name: 'attack', url: '' }},
    { base_stat: 65, effort: 0, stat: { name: 'special-attack', url: '' }},
    { base_stat: 999, effort: 0, stat: { name: 'speed', url: '' }},
  ];

  it('renders all stat names and their base stats', () => {
    const { getByText } = render(<PokemonStatsPage stats={sampleStats} />);
    expect(getByText('Stats:')).toBeTruthy();
    sampleStats.forEach(s => {
      // Raw text is the original name; capitalization is via CSS style.
      expect(getByText(s.stat.name)).toBeTruthy();
      expect(getByText(String(s.base_stat))).toBeTruthy();
    });
  });

  it('applies capitalization style to stat names', () => {
    const { getByText } = render(<PokemonStatsPage stats={sampleStats} />);
    const statName = getByText('hp');
    // Inline style should include text-transform: capitalize   
    expect(statName).toHaveStyle({ textTransform: 'capitalize' });
  });
  
  it('renders only the Stats label when the list is empty', () => {
    const { getByText, queryByText } = render(<PokemonStatsPage stats={[]} />);
    expect(getByText('Stats:')).toBeTruthy();
    expect(queryByText('hp')).toBeNull();
  });
});