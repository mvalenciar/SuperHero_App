import type { Superhero } from "../interfaces/superhero.interface";

export const createMockHero = (
  overrides: Partial<Superhero> = {},
): Superhero => ({
  id: 0,
  name: "",
  slug: "",
  fullname: "",
  image: "",
  gender: "",
  race: null,
  height: [],
  weight: [],
  placeOfBirth: "",
  publisher: null,
  stats: {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  },
  work: "",
  type: "",
  groupAffiliation: "",
  ...overrides,
});
