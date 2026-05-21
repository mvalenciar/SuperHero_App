//Hooks
import { useContext, useMemo, useState } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { CustomSearchController } from "@/components/custom/CustomSearchController";

export const FavoritesPage = () => {
  const { heroes, loading, favoriteHeroesId } = useContext(HeroesContext);

  // const loadSuperheroesFavorites = useMemo(
  //   () => heroes.filter((hero) => favoriteHeroesId.includes(hero.id)),
  //   [favoriteHeroesId, heroes],
  // );

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
      <CustomSearchController
        onQuery={setSearchTerm}
        placeholder="Buscar favorito..."
      />
      <HeroesGrid heroes={filteredHeroes} loading={loading} />
    </div>
  );
};
