//hooks
import { useEffect, type PropsWithChildren } from "react";
import { useHeroes } from "../features/heroes/hooks/useHeroes";
import { useFavorite } from "../features/heroes/hooks/useFavorite";

//contexto
import { HeroesContext } from "./HeroesContext";

export const HeroesContextProvider = ({ children }: PropsWithChildren) => {
  const { heroes, loading, loadHeroes } = useHeroes();
  const { favoriteHeroesId, isFavorite, saveFavoriteHero, showFavorites } =
    useFavorite();

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  useEffect(() => {
    showFavorites();
  }, [showFavorites]);

  //   //1. Verificar el tipo de parámetro correcto
  //   if (typeof id !== "number" || id < 0) return;

  //   //2. Revisar cache
  //   const cacheHeroesFavoritesId = localStorage.getItem("favoritesId");

  //   //3.Guardar el estado actual de los favoritos; si no, inicializar
  //   const currentFavorites: number[] = cacheHeroesFavoritesId
  //     ? JSON.parse(cacheHeroesFavoritesId)
  //     : [];

  //   //4.Si el héroe ya existe
  //   const heroAlreadyExist = currentFavorites.includes(id);

  //   if (heroAlreadyExist) {
  //     const updatedFavorite = currentFavorites.filter(
  //       (heroId) => heroId !== id,
  //     );

  //     setFavoriteHeroesId(updatedFavorite);

  //     localStorage.setItem("favoritesId", JSON.stringify(updatedFavorite));

  //     return;
  //   }
  //   //5. Si el héroe no existe
  //   const updatedFavorite = [...currentFavorites, id];

  //   setFavoriteHeroesId(updatedFavorite);

  //   localStorage.setItem("favoritesId", JSON.stringify(updatedFavorite));
  // };

  // const isFavorite = (id: number) => {
  //   return favoriteHeroesId.includes(id);
  // };

  return (
    <HeroesContext.Provider
      value={{
        //state
        heroes,
        loading,
        favoriteHeroesId,

        //methods
        isFavorite,
        saveFavorite: saveFavoriteHero,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};
