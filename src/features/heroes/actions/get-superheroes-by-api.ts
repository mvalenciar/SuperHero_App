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
            hero.biography.publisher === "DC Comics") &&
          (hero.biography.alignment === "good" ||
            hero.biography.alignment === "bad"),
      )
      .map((superhero) => ({
        id: superhero.id,
        name: superhero.name,
        fullname: superhero.biography.fullName,
        image: superhero.images.lg,
        publisher: superhero.biography.publisher,
        stats: {
          intelligence: superhero.powerstats.intelligence,
          strength: superhero.powerstats.strength,
          speed: superhero.powerstats.speed,
          durability: superhero.powerstats.durability,
          power: superhero.powerstats.power,
          combat: superhero.powerstats.combat,
        },
        type: superhero.biography.alignment,
      }));

    return superheroesList;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error obteniendo superhéroes:", error.message);
    }
    throw error;
  }
};
