import { CustomHeader } from "@/components/custom/CustomHeader";
import { Hero } from "@/components/custom/Hero";
import { HeroStats } from "../../components/HeroStats";
import { HeroesGrid } from "../../components/HeroesGrid";
import { superHeroes } from "../../data/data";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <CustomHeader />
      <HeroStats />
      {/* <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 p-2">
        <HeroCard {...batmanData} />
        <HeroCard {...batmanData} />
        <HeroCard {...batmanData} />
        <HeroCard {...batmanData} />
        <HeroCard {...batmanData} />
        <HeroCard {...batmanData} />
        <HeroCard {...batmanData} />
        <HeroCard {...batmanData} />
      </div> */}
      <HeroesGrid heroes={superHeroes} />
    </div>
  );
};
