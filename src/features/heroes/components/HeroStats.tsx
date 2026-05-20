//Hooks
import { useHeroesStats } from "../hooks/useHeroesStats";

//Components
import { Badge } from "../../../shared/components/ui/badge";
import { Brain, Heart, User, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";

export const HeroStats = () => {
  const {
    totalHeroes,
    favoritesStats,
    smartestHero,
    strongestHero,
    quantityHeroes,
    quantityVillains,
  } = useHeroesStats();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-2">
      {/*💯 Total De Personajes */}
      <HeroStatCard
        title="Total de Personajes"
        icon={User}
        value={totalHeroes}
        footer={
          <div className="flex flex-wrap gap-2 w-full">
            <Badge className="bg-emerald-100 text-emerald-800">{`${quantityHeroes} Héroes`}</Badge>
            <Badge
              variant={"destructive"}
            >{`${quantityVillains} Villanos`}</Badge>
          </div>
        }
      />

      {/*❤️ Total De Favoritos */}
      <HeroStatCard
        title="Total de Favoritos"
        icon={Heart}
        value={favoritesStats.value}
        valueClassName="text-red-500"
        description={`${favoritesStats.percentage} % del total`}
      />

      {/*💪 Mas Fuerte */}
      <HeroStatCard
        title="Héroe Más Fuerte"
        icon={Zap}
        value={strongestHero?.name ?? "N/A"}
        description={`Fuerza: ${strongestHero?.stats.strength ?? "?"}/100`}
      />

      {/*🧠 Mas Inteligente */}
      <HeroStatCard
        title="Héroe Más Inteligente"
        icon={Brain}
        value={smartestHero?.name ?? "N/A"}
        description={`Inteligencia: ${smartestHero?.stats.intelligence ?? "?"}/100`}
      />
    </div>
  );
};
