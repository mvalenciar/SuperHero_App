import { createContext, useEffect, type PropsWithChildren } from "react";
import { useHeroes } from "../features/heroes/hooks/useHeroes";
import type { superhero } from "src/features/heroes/interfaces/superhero.interface";

interface HeroesContextProps {
  //state
  heroes: superhero[];
  loading: boolean;
}

export const HeroesContext = createContext<HeroesContextProps>(
  {} as HeroesContextProps,
);

export const HeroesContextProvider = ({ children }: PropsWithChildren) => {
  const { heroes, loading, loadHeroes } = useHeroes();

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        loading,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};
