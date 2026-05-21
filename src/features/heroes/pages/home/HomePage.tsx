//Hooks
import { useContext, useMemo, useState } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { CustomHeader } from "@/components/custom/CustomHeader";
import { Hero } from "@/components/custom/Hero";
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { CustomSearchController } from "@/components/custom/CustomSearchController";

export const HomePage = () => {
  const { heroes, loading } = useContext(HeroesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHeroes = useMemo(() => {
    if (!searchTerm.trim()) return heroes;

    return heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [heroes, searchTerm]);

  return (
    <div>
      <Hero />
      <CustomHeader
        title="Bienvenido a la Hero App"
        description="Explora y conoce a fondo a héroes y villanos del universo de DC y
        Marvel. Descubre sus poderes, historias y selecciona a tus favoritos."
      />
      <HeroStats />
      <CustomSearchController
        placeholder="Buscar héroes o villanos..."
        onQuery={setSearchTerm}
      />
      <HeroesGrid heroes={filteredHeroes} loading={loading} />
    </div>
  );
};
