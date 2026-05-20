//Hooks
import { useContext, useMemo } from "react";
import { HeroesContext } from "../../../../context/HeroesContext";

//Components
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { CustomHeader } from "@/components/custom/CustomHeader";

export const FavoritesPage = () => {
  const { heroes, loading, favoriteHeroesId } = useContext(HeroesContext);

  const loadSuperheroesFavorites = useMemo(
    () => heroes.filter((hero) => favoriteHeroesId.includes(hero.id)),
    [favoriteHeroesId, heroes],
  );

  return (
    <div className="mt-16">
      <CustomHeader
        title="Favorites"
        description="Explora y conoce a fondo a héroes y villanos favoritos"
      />
      <HeroStats />
      <HeroesGrid heroes={loadSuperheroesFavorites} loading={loading} />
    </div>
  );
};
