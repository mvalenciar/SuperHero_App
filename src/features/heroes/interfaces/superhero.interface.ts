export interface Superhero {
  id: number;
  name: string;
  fullname: string;
  image: string;
  publisher: string | null;
  stats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  type: string;
}
