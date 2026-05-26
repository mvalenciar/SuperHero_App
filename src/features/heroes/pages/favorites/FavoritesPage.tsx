//Hooks
import { useContext, useMemo, useState } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { SearchBar } from "@/components/custom/SearchBar";
import { SearchHeroSection } from "../../components/SearchHeroSection";
import { HeroesDisplaySection } from "../../components/HeroesDisplaySection";

export const FavoritesPage = () => {
  const { heroes, loading, favoriteHeroesId } = useContext(HeroesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHeroes = useMemo(() => {
    const orderedFavorites = favoriteHeroesId
      .map((id) => heroes.find((hero) => hero.id === id))
      .filter((hero) => hero !== undefined);
    if (!searchTerm.trim()) {
      return orderedFavorites;
    }

    return orderedFavorites.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    //
  }, [heroes, searchTerm, favoriteHeroesId]);

  return (
    <div className="mt-16">
      <CustomHeader
        title="Favorites"
        description="Explora y conoce a fondo a héroes y villanos favoritos"
      />
      <HeroStats />
      <SearchHeroSection>
        <SearchBar placeholder="Buscar favorito..." onQuery={setSearchTerm} />
      </SearchHeroSection>
      <HeroesDisplaySection heroes={filteredHeroes} loading={loading}>
        <HeroesGrid heroes={filteredHeroes} from="/favorites" />
      </HeroesDisplaySection>
    </div>
  );
};
