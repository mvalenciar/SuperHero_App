import { superheroApi } from "../api/akababSuperhero.api";
import type { SuperheroResponse } from "../interfaces/akababSuperhero.response";
import type { Superhero } from "../interfaces/superhero.interface";

const HEROES_ENDPOINT = "/all.json";

export const getSuperheroesByApi = async (): Promise<Superhero[]> => {
  try {
    const response = await superheroApi<SuperheroResponse[]>(HEROES_ENDPOINT);

    const superheroesList: Superhero[] = response.data
      .filter(
        (hero) =>
          (hero.biography.publisher === "Marvel Comics" ||
            hero.biography.publisher === "DC Comics" ||
            hero.biography.publisher === "Dark Horse Comics") &&
          (hero.biography.alignment === "good" ||
            hero.biography.alignment === "bad") &&
          (hero.appearance.gender === "Female" ||
            hero.appearance.gender === "Male"),
      )
      .map((superhero) => ({
        id: superhero.id,
        name: superhero.name,
        slug: superhero.slug,
        fullname: superhero.biography.fullName,
        image: superhero.images.lg,
        gender: superhero.appearance.gender,
        race: superhero.appearance.race,
        height: superhero.appearance.height,
        weight: superhero.appearance.weight,
        placeOfBirth: superhero.biography.placeOfBirth,
        publisher: superhero.biography.publisher,
        stats: {
          intelligence: superhero.powerstats.intelligence,
          strength: superhero.powerstats.strength,
          speed: superhero.powerstats.speed,
          durability: superhero.powerstats.durability,
          power: superhero.powerstats.power,
          combat: superhero.powerstats.combat,
        },
        work: superhero.work.occupation,
        type: superhero.biography.alignment,
        groupAffiliation: superhero.connections.groupAffiliation,
      }));

    return superheroesList;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error obteniendo superhéroes:", error.message);
    }
    throw error;
  }
};
