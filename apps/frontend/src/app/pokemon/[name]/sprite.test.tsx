import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PokemonSpritePage from "./sprite";

//Next.js Image mocked to avoid the encoding of the src URL
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("PokemonSpritePage", () => {
  it("renders the official artwork sprite when available", () => {
    const sprites = {
      front_default: "http://example.com/front.png",
      other: {
        "official-artwork": {
          front_default: "http://example.com/official-artwork.png",
        },
      },
    };
    render(<PokemonSpritePage name="bulbasaur" sprites={sprites} />);
    const img = screen.getByAltText("bulbasaur") as HTMLImageElement;
    expect(img.src).toContain("http://example.com/official-artwork.png");
  });

  it("renders the front_default sprite when official artwork is not available", async () => {
    const sprites = {
      front_default: "http://example.com/front.png",
      other: {
        "official-artwork": {
          front_default: null,
        },
      },
    };
    render(<PokemonSpritePage name="bulbasaur" sprites={sprites} />);
    const img = screen.getByAltText("bulbasaur") as HTMLImageElement;
    expect(img.src).toBe("http://example.com/front.png");    
  });
});