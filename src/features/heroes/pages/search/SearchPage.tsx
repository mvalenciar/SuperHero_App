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
  const [publisherFilter, setPublisherFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const filteredHeroes = useMemo(() => {
    return heroes.filter(
      (hero) =>
        (!searchTerm ||
          hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hero.fullname.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!publisherFilter ||
          hero.publisher
            ?.toLowerCase()
            .includes(publisherFilter.toLowerCase())) &&
        (!typeFilter ||
          hero.type?.toLowerCase().includes(typeFilter.toLowerCase())) &&
        (!genderFilter ||
          hero.gender?.toLowerCase() === genderFilter.toLowerCase()),
    );
  }, [heroes, searchTerm, publisherFilter, typeFilter, genderFilter]);

  return (
    <section className="mt-16">
      <header>
        <CustomHeader
          title="Búsqueda Avanzada"
          description="Encuentra a tus héroes mediante filtros avanzados, especificando su publisher DC o Marvel"
        />
      </header>
      <HeroStats />
      <SearchHeroSection>
        <SearchBar placeholder={"Buscar Héroes"} onQuery={setSearchTerm} />
        <SearchFilters
          onPublisherFilter={setPublisherFilter}
          onTypeFilter={setTypeFilter}
          onGenderFilter={setGenderFilter}
        />
      </SearchHeroSection>
      <HeroesDisplaySection heroes={filteredHeroes} loading={loading}>
        <HeroesGrid heroes={filteredHeroes} from="/advancedSearch" />
      </HeroesDisplaySection>
    </section>
  );
};
