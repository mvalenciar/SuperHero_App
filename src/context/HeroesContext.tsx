import { createContext } from "react";

import type { Superhero } from "../features/heroes/interfaces/superhero.interface.ts";

interface HeroesContextProps {
  //state
  heroes: Superhero[];
  loading: boolean;
  favoriteHeroesId: number[];

  //Methods
  isFavorite: (id: number) => boolean;
  saveFavorite: (id: number) => void;
}

export const HeroesContext = createContext<HeroesContextProps>(
  {} as HeroesContextProps,
);
