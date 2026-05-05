interface HeroStatBarProps {
  stat: string;
  value: number;
}

// Barras de stats empleadas para las estadísticas de los superheroes en las hero cards

export const HeroStatBar = ({ stat, value }: HeroStatBarProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400 uppercase tracking-wider">{stat}</span>
        <span className="text-amber-400 font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
