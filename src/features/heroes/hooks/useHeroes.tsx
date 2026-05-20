//hooks
import { useCallback, useState } from "react";
//type and actions
import type { Superhero } from "../interfaces/superhero.interface";
import { getSuperheroesByApi } from "../actions/get-superheroes-by-api";

export const useHeroes = () => {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(true);

  //Función para cargar los héroes
  const loadHeroes = useCallback(async () => {
    try {
      //1. Revisar Cache
      const cachedHeroes = localStorage.getItem("heroes");

      //stale-while-revalidate
      if (cachedHeroes) {
        setHeroes(JSON.parse(cachedHeroes));
        //return;
      }

      //2. Convocar la data de los heroes desde la API
      const data = await getSuperheroesByApi();

      //3. Guardar en state.
      setHeroes(data);

      //4. Guardar en cache
      localStorage.setItem("heroes", JSON.stringify(data));
    } catch (error) {
      console.error("Error desde effect loading héroes", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchHeroByTerm = (term: string) => {
    const heroesCache = localStorage.getItem("heroes");
    if (heroesCache) {
      const customHeroes: Superhero[] = JSON.parse(heroesCache);
      const filterHeroes = customHeroes.filter(
        (hero) =>
          hero.name.toLowerCase().includes(term.toLocaleLowerCase()) ||
          hero.fullname.toLowerCase().includes(term.toLocaleLowerCase()),
      );
      setHeroes(filterHeroes);
    }
  };

  return {
    //values
    heroes,
    loading,

    //action
    loadHeroes,
    searchHeroByTerm,
  };
};
