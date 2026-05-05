import { cn } from "@/lib/utils";

import { HeroStatBar } from "./HeroStatBar";

import { Badge } from "../../../shared/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface HeroCardProps {
  name: string;
  alias: string;
  image: string;
  powers: string[];
  team: string;
  description: string;
  stats: {
    strength: number;
    speed: number;
    intelligence: number;
  };
}

export function HeroCard({
  name,
  alias,
  image,
  powers,
  team,
  description,
  stats,
}: HeroCardProps) {
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
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Team badge */}
        <Badge className="absolute top-4 right-4 bg-amber-500/90 text-zinc-950 font-semibold border-0 backdrop-blur-sm">
          {team}
        </Badge>

        {/* Hero name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-1">
            {alias}
          </p>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {name}
          </h2>
        </div>
      </div>

      <CardContent className="relative space-y-5 pt-2">
        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Powers */}
        <div className="flex flex-wrap gap-2">
          {powers.map((power) => (
            <Badge
              key={power}
              variant="secondary"
              className="bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/80 hover:text-amber-400 transition-colors text-xs"
            >
              {power}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="space-y-3 pt-2">
          <HeroStatBar stat="Fuerza" value={stats.strength} />
          <HeroStatBar stat="Velocidad" value={stats.speed} />
          <HeroStatBar stat="Inteligencia" value={stats.intelligence} />
        </div>

        {/* DC Logo watermark */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center gap-2 text-zinc-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-xs font-medium tracking-wider uppercase">
              DC Universe
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
