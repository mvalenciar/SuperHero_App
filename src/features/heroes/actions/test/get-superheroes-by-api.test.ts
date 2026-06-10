import { expect, vi } from "vitest";
import { describe, test } from "vitest";
import { superheroApi } from "../../api/akababSuperhero.api";
import { getSuperheroesByApi } from "../get-superheroes-by-api";
import { createMockApiHero } from "../../test/superhero.factory";

vi.mock("../../api/akababSuperhero.api", () => ({
  superheroApi: vi.fn(),
}));

const mockedSuperheroApi = vi.mocked(superheroApi);

const hero = createMockApiHero();

describe("get-superheroes-by-api", () => {
  test("should return transformed superheroes", async () => {
    mockedSuperheroApi.mockResolvedValue({
      data: [hero],
    });

    const result = await getSuperheroesByApi();

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject({
      id: hero.id,
      name: hero.name,
      slug: hero.slug,
      fullname: hero.biography.fullName,
      image: hero.images.lg,
      gender: hero.appearance.gender,
      race: hero.appearance.race,
    });
    expect(mockedSuperheroApi).toHaveBeenCalledWith("/all.json");
  });

  test("should filter invalid superheroes", async () => {
    const validHero = hero;
    mockedSuperheroApi.mockResolvedValue({
      data: [
        validHero,
        {
          ...validHero,
          id: 2,
          biography: {
            ...validHero.biography,
            publisher: "Unknown Publisher",
          },
        },
      ],
    });

    const result = await getSuperheroesByApi();

    expect(result).toHaveLength(1);
  });
  test("should throw error when api request fails", async () => {
    mockedSuperheroApi.mockRejectedValue(new Error("network error"));

    await expect(getSuperheroesByApi()).rejects.toThrow("network error");
  });
});
