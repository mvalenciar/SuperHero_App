//Hooks
import { useContext } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { CustomHeader } from "@/components/custom/CustomHeader";
import { Hero } from "@/components/custom/Hero";
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";

export const HomePage = () => {
  const { heroes, loading } = useContext(HeroesContext);

  return (
    <div>
      <Hero />
      <CustomHeader />
      <HeroStats />
      <HeroesGrid heroes={heroes} loading={loading} />
    </div>
  );
};
