import { useState } from "react";

export const useFavorite = () => {
  const [favoriteHeroesId, setFavoriteHeroesId] = useState<number[]>([]);

  // Función Actualizar estado de los favoritos
  const saveFavoriteHero = (id: number) => {
    //1. Verificar el tipo de parámetro correcto
    if (typeof id !== "number" || id < 0) return;

    //2. Revisar cache
    const cacheHeroesFavoritesId = localStorage.getItem("favoritesId");

    //3.Guardar en memoria los favoritos actuales; si no, inicializar
    const currentFavorites: number[] = cacheHeroesFavoritesId
      ? JSON.parse(cacheHeroesFavoritesId)
      : [];

    //4. Si el héroe ya existe entre los favoritos
    const heroAlreadyExist = currentFavorites.includes(id);

    if (heroAlreadyExist) {
      //4.1. Se elimina el heroId de los favoritos
      const updatedFavorite = currentFavorites.filter(
        (heroId) => heroId !== id,
      );

      //4.2. Actualizar el estado de los favoritos
      setFavoriteHeroesId(updatedFavorite);
      //4.3. Guardar en cache
      localStorage.setItem("favoritesId", JSON.stringify(updatedFavorite));

      return;
    }
    //5. Si el héroe no existe
    const updatedFavorite = [...currentFavorites, id];
    //5.1. Actualizar el estado
    setFavoriteHeroesId(updatedFavorite);
    //5.2. Guardar en cache
    localStorage.setItem("favoritesId", JSON.stringify(updatedFavorite));
  };

  //Función para verificar los favoritos
  const isFavorite = (id: number) => {
    return favoriteHeroesId.includes(id);
  };

  //Función para mostrar los favoritos
  const showFavorites = () => {
    const cacheHeroesFavoritesId = localStorage.getItem("favoritesId");
    if (cacheHeroesFavoritesId) {
      setFavoriteHeroesId(JSON.parse(cacheHeroesFavoritesId));
    }
  };

  return {
    //values
    favoriteHeroesId,

    //action
    saveFavoriteHero,
    isFavorite,
    showFavorites,
  };
};
