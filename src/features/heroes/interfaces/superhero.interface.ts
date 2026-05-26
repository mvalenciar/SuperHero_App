export interface Superhero {
  id: number;
  name: string;
  slug: string;
  fullname: string;
  image: string;
  gender: string;
  race: string | null;
  height: string[];
  weight: string[];
  placeOfBirth: string;
  publisher: string | null;
  stats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  work: string;
  type: string;
  groupAffiliation: string;
}
