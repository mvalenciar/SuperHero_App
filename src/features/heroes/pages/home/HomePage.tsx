//Hooks
import { useEffect } from "react";

//Components
import { CustomHeader } from "@/components/custom/CustomHeader";
import { Hero } from "@/components/custom/Hero";
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { useHeroes } from "../../hooks/useHeroes";

export const HomePage = () => {
  const { heroes, loading, loadHeroes } = useHeroes();

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  return (
    <div>
      <Hero />
      <CustomHeader />
      <HeroStats />
      <HeroesGrid heroes={heroes} loading={loading} />
    </div>
  );
};
