import { createContext } from "react";

import type { superhero } from "src/features/heroes/interfaces/superhero.interface";

interface HeroesContextProps {
  //state
  heroes: superhero[];
  loading: boolean;
  favoriteHeroesId: number[];

  //Methods
  isFavorite: (id: number) => boolean;
  saveFavorite: (id: number) => void;
}

export const HeroesContext = createContext<HeroesContextProps>(
  {} as HeroesContextProps,
);
