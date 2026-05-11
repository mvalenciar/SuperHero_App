//hooks
import { useState } from "react";
//type and actions
import type { superhero } from "../interfaces/superhero.interface";
import { getSuperheroesByApi } from "../actions/get-superheroes-by-api";

export const useHeroes = () => {
  const [heroes, setHeroes] = useState<superhero[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHeroes = async () => {
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
  };
  return {
    //values
    heroes,
    loading,

    //action
    loadHeroes,
  };
};
