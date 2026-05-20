import { useContext, useMemo } from "react";
import type { Superhero } from "../interfaces/superhero.interface";
import { HeroesContext } from "../../../context/HeroesContext";

export const useHeroesStats = () => {
  const { heroes, favoriteHeroesId } = useContext(HeroesContext);

  const favoritesStats = useMemo(
    () => ({
      value: favoriteHeroesId.length,
      percentage:
        heroes.length > 0
          ? Math.ceil((favoriteHeroesId.length / heroes.length) * 100)
          : 0,
    }),
    [heroes, favoriteHeroesId],
  );

  const strongestHero = useMemo<Superhero | null>(() => {
    if (!heroes.length) return null;

    return heroes.reduce((max, hero) => {
      if (hero.stats.strength > max.stats.strength) {
        return hero;
      }

      return max;
    });
  }, [heroes]);

  const smartestHero = useMemo<Superhero | null>(() => {
    if (!heroes.length) return null;

    return heroes.reduce((max, hero) => {
      if (hero.stats.intelligence > max.stats.intelligence) return hero;
      return max;
    });
  }, [heroes]);

  return {
    //values
    totalHeroes: heroes.length,
    favoritesStats,
    strongestHero,
    smartestHero,
    quantityHeroes: heroes.filter((hero) => hero.type === "good").length,
    quantityVillains: heroes.filter((hero) => hero.type === "bad").length,
  };
};
