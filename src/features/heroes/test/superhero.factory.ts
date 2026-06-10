import type { SuperheroResponse } from "../interfaces/akababSuperhero.response";
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

export const createMockApiHero = (
  overrides: Partial<SuperheroResponse> = {},
): SuperheroResponse => ({
  id: 1,
  name: "Spider-Man",
  slug: "spider-man",

  powerstats: {
    intelligence: 90,
    strength: 55,
    speed: 67,
    durability: 75,
    power: 74,
    combat: 85,
  },

  appearance: {
    gender: "Male",
    race: "Human",
    height: ["5'10", "178 cm"],
    weight: ["167 lb", "75 kg"],
    eyeColor: "Hazel",
    hairColor: "Brown",
  },

  biography: {
    fullName: "Peter Parker",
    alterEgos: "No alter egos found.",
    aliases: ["Spidey"],
    placeOfBirth: "New York, New York",
    firstAppearance: "Amazing Fantasy #15",
    publisher: "Marvel Comics",
    alignment: "good",
  },

  work: {
    occupation: "Photographer",
    base: "New York",
  },

  connections: {
    groupAffiliation: "Avengers",
    relatives: "May Parker",
  },

  images: {
    xs: "xs.jpg",
    sm: "sm.jpg",
    md: "md.jpg",
    lg: "lg.jpg",
  },

  ...overrides,
});
