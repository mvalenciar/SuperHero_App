import type { HeroNavigationFrom } from "./heroNavigationFrom.type";
import type { Superhero } from "./superhero.interface";

export interface HeroLocationState {
  hero?: Superhero;
  from?: HeroNavigationFrom;
}
