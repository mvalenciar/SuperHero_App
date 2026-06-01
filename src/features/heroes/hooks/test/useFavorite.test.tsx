import { renderHook, act } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useFavorite } from "../useFavorite";

const renderUseFavorite = () => renderHook(() => useFavorite());
describe("useFavorite", () => {
  test("should initialize with empty favorites", () => {
    const { result } = renderUseFavorite();

    expect(result.current.favoriteHeroesId).toEqual([]);
  });

  test("should add hero to favorites", () => {
    const { result } = renderUseFavorite();
    act(() => {
      result.current.saveFavoriteHero(1);
    });
    expect(result.current.favoriteHeroesId).toEqual([1]);
  });

  test("should save favorites in localStorage", () => {
    const { result } = renderUseFavorite();

    act(() => {
      result.current.saveFavoriteHero(1);
    });

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem("favoritesId")).toBe(JSON.stringify([1]));
  });

  test("should remove hero if already exists", () => {
    const { result } = renderUseFavorite();
    act(() => {
      result.current.saveFavoriteHero(1);
    });

    act(() => {
      result.current.saveFavoriteHero(2);
    });

    act(() => {
      result.current.saveFavoriteHero(3);
    });

    act(() => {
      result.current.saveFavoriteHero(3);
    });

    expect(result.current.favoriteHeroesId).toEqual([2, 1]);
  });

  test("should not save invalid ids", () => {
    const { result } = renderUseFavorite();

    act(() => {
      result.current.saveFavoriteHero(-1);
    });

    expect(result.current.favoriteHeroesId).toEqual([]);
  });

  test("should return true if hero is favorite", () => {
    const { result } = renderUseFavorite();

    act(() => {
      result.current.saveFavoriteHero(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);
  });

  test("should load favorites from localStorage", () => {
    localStorage.setItem("favoritesId", JSON.stringify([1, 2, 3]));

    const { result } = renderUseFavorite();

    act(() => {
      result.current.showFavorites();
    });

    expect(result.current.favoriteHeroesId).toEqual([1, 2, 3]);
  });
});
