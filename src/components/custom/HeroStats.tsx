import { Badge } from "../ui/badge";
import { Brain, Heart, User, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";

export const HeroStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-2">
      {/*💯 Total De Personajes */}
      <HeroStatCard
        title="Total de Personajes"
        icon={User}
        value={16}
        footer={
          <div className="flex flex-wrap gap-2 w-full">
            <Badge className="bg-emerald-100 text-emerald-800">12 Heroes</Badge>
            <Badge variant={"destructive"}>10 Villanos</Badge>
          </div>
        }
      />

      {/*❤️ Total De Favoritos */}
      <HeroStatCard
        title="Total de Favoritos"
        icon={Heart}
        value={8}
        valueClassName="text-red-500"
        description="18% del total"
      />

      {/*💪 Mas Fuerte */}
      <HeroStatCard
        title="Héroe Más Fuerte"
        icon={Zap}
        value="Alias"
        description="Fuerza: 10/10"
      />

      {/*🧠 Mas Inteligente */}
      <HeroStatCard
        title="Héroe Más Inteligente"
        icon={Brain}
        value="Alias"
        description="Inteligencia: 10/10"
      />
    </div>
  );
};
