//Hooks
import { useEffect, useState } from "react";

//type and actions

import type { superhero } from "../../interfaces/superhero.interface";
import { getSuperheroesByApi } from "../../actions/get-superheroes-by-api";

//Components
import { CustomHeader } from "@/components/custom/CustomHeader";
import { Hero } from "@/components/custom/Hero";
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";

export const HomePage = () => {
  const [heroes, setHeroes] = useState<superhero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    loadHeroes();
  }, []);

  return (
    <div>
      <Hero />
      <CustomHeader />
      <HeroStats />
      <HeroesGrid heroes={heroes} loading={loading} />
    </div>
  );
};
