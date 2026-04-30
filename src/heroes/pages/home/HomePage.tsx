import { CustomHeader } from "@/components/custom/CustomHeader";
import { Hero } from "../../../components/custom/Hero";
import { HeroStats } from "@/components/custom/HeroStats";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <CustomHeader />
      <HeroStats />
    </div>
  );
};
