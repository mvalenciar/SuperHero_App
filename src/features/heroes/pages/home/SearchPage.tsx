//Hooks
import { useContext, useMemo, useState } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { CustomHeader } from "@/components/custom/CustomHeader";
import { Hero } from "@/components/custom/Hero";
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { SearchBar } from "@/components/custom/SearchBar";
import { SearchHeroSection } from "../../components/SearchHeroSection";
import { SearchFilters } from "@/components/custom/SearchFilters";

export const SearchPage = () => {
  const { heroes, loading } = useContext(HeroesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHeroes = useMemo(() => {
    if (!searchTerm.trim()) return heroes;

    return heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.fullname.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [heroes, searchTerm]);

  return (
    <div>
      <Hero />
      <CustomHeader
        title="Búsqueda Avanzada"
        description="Encuentra a tus héroes mediante filtros avanzados, especificando su publisher DC o Marvel"
      />
      <HeroStats />
      <SearchBar
        placeholder="Buscar héroes o villanos..."
        onQuery={setSearchTerm}
      />
      <SearchHeroSection
        searchBar={
          <SearchBar placeholder={"Buscar Héroes"} onQuery={setSearchTerm} />
        }
        searchFilters={<SearchFilters />}
      />

      <HeroesGrid heroes={filteredHeroes} loading={loading} />
    </div>
  );
};
