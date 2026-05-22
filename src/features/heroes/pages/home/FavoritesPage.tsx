//Hooks
import { useContext, useMemo, useState } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { SearchBar } from "@/components/custom/SearchBar";
import { SearchHeroSection } from "../../components/SearchHeroSection";

export const FavoritesPage = () => {
  const { heroes, loading, favoriteHeroesId } = useContext(HeroesContext);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredHeroes = useMemo(() => {
    if (!searchTerm.trim())
      return heroes.filter((hero) => favoriteHeroesId.includes(hero.id));

    return heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        favoriteHeroesId.includes(hero.id),
    );
  }, [heroes, searchTerm, favoriteHeroesId]);

  return (
    <div className="mt-16">
      <CustomHeader
        title="Favorites"
        description="Explora y conoce a fondo a héroes y villanos favoritos"
      />
      <HeroStats />
      <SearchHeroSection
        searchBar={
          <SearchBar placeholder="Buscar favorito..." onQuery={setSearchTerm} />
        }
      />
      <HeroesGrid heroes={filteredHeroes} loading={loading} />
    </div>
  );
};
