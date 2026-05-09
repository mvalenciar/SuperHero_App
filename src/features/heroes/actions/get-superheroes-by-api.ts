import { superheroApi } from "../api/akababSuperhero.api";
import type { SuperheroResponse } from "../interfaces/akababSuperhero.response";
import type { superhero } from "../interfaces/superhero.interface";

const HEROES_ENDPOINT = "/all.json";

export const getSuperheroesByApi = async (): Promise<superhero[]> => {
  try {
    const response = await superheroApi<SuperheroResponse[]>(HEROES_ENDPOINT);

    const superheroesList: superhero[] = response.data
      .filter(
        (hero) =>
          hero.biography.publisher === "Marvel Comics" ||
          hero.biography.publisher === "DC Comics",
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
      }));

    return superheroesList;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error obteniendo superhéroes:", error.message);
    }
    throw error;
  }
};
