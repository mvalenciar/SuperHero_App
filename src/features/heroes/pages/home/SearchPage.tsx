//Hooks
import { useContext, useMemo, useState } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { CustomHeader } from "@/components/custom/CustomHeader";
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { SearchBar } from "@/components/custom/SearchBar";
import { SearchHeroSection } from "../../components/SearchHeroSection";
import { SearchFilters } from "@/components/custom/SearchFilters";
import { HeroesDisplaySection } from "../../components/HeroesDisplaySection";

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
    <div className="mt-16">
      <CustomHeader
        title="Búsqueda Avanzada"
        description="Encuentra a tus héroes mediante filtros avanzados, especificando su publisher DC o Marvel"
      />
      <HeroStats />
      <SearchHeroSection>
        <SearchBar placeholder={"Buscar Héroes"} onQuery={setSearchTerm} />
        <SearchFilters />
      </SearchHeroSection>
      <HeroesDisplaySection heroes={filteredHeroes} loading={loading}>
        <HeroesGrid heroes={filteredHeroes} />
      </HeroesDisplaySection>
    </div>
  );
};
