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
      <CustomHeader
        title="Bienvenido a la Hero App"
        description="Explora y conoce a fondo a héroes y villanos del universo de DC y
        Marvel. Descubre sus poderes, historias y selecciona a tus favoritos."
      />
      <HeroStats />
      <HeroesGrid heroes={heroes} loading={loading} />
    </div>
  );
};
