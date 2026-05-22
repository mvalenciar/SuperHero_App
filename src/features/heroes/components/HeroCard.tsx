//hooks
import { useContext, useState } from "react";

//Contexto
import { HeroesContext } from "../../../context/HeroesContext";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { HeroStatBar } from "./HeroStatBar";
import { Heart } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

//Action and types
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Superhero } from "../interfaces/superhero.interface";

interface HeroCardProps {
  hero: Superhero;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
  const [loadedImage, setLoadedImage] = useState("");
  const { isFavorite, saveFavorite } = useContext(HeroesContext);

  const imageLoaded = loadedImage === hero.image;
  return (
    <Card
      className={cn(
        "group relative w-full max-w-sm overflow-hidden",
        "bg-zinc-950 border-zinc-800/50",
        "hover:border-amber-500/30 transition-all duration-500",
        "shadow-2xl shadow-zinc-950/50",
      )}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hero Image */}
      <div className="relative h-72 overflow-hidden bg-amber-200">
        {/* Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-700 flex justify-center items-center">
            <Spinner className="size-20" />
          </div>
        )}

        <img
          key={hero.image}
          src={hero.image}
          alt={hero.name}
          loading="lazy"
          onLoad={() => setLoadedImage(hero.image)}
          onError={() => setLoadedImage(hero.image)}
          className={cn(
            "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        <div className="w-full flex items-center justify-between absolute top-0 pr-3 pl-3">
          {/* Favorite button */}

          <Button
            className="bg-white rounded-md shadow-md p-0 size-10 cursor-pointer"
            onClick={() => saveFavorite(hero.id)}
          >
            <Heart
              className={cn(
                "size-8 cursor-pointer transition-all duration-300 active:scale-125",
                isFavorite(hero.id)
                  ? "text-rose-500 fill-rose-500 scale-110"
                  : "text-muted-foreground hover:scale-110",
              )}
            />
          </Button>
          {/* Power badge */}
          <div className="bg-amber-500/90 text-zinc-950 font-semibold border-0 backdrop-blur-sm rounded-full p-2 text-xl size-12 flex justify-center items-center">
            {hero.stats.power}
          </div>
        </div>

        {/* Hero name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-1">
            {hero.fullname === "" ? `${hero.name}` : `${hero.fullname}`}
          </p>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {hero.name}
          </h2>
        </div>
      </div>

      <CardContent className="relative space-y-5 pt-2">
        {/* Stats */}
        <div className="space-y-3 pt-2">
          <HeroStatBar stat="Fuerza" value={hero.stats.strength} />
          <HeroStatBar stat="Velocidad" value={hero.stats.speed} />
          <HeroStatBar stat="Inteligencia" value={hero.stats.intelligence} />
        </div>

        {/* Publisher Logo watermark */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center gap-2 text-zinc-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-xs font-medium tracking-wider uppercase">
              {hero.publisher}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
