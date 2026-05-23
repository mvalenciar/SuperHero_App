import { Spinner } from "@/components/ui/spinner";
import type { Superhero } from "../interfaces/superhero.interface";
import { HeroesEmptyState } from "./HeroesEmptyState";

interface HeroesDisplaySectionProps {
  heroes: Superhero[];
  loading: boolean;
  children: React.ReactNode;
}

export const HeroesDisplaySection = ({
  heroes,
  loading,
  children,
}: HeroesDisplaySectionProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-3 p-2 min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (heroes.length > 0) return <div>{children}</div>;
  return <HeroesEmptyState />;
};
