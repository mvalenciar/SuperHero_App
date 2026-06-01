import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

//mock del local storage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),

    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),

    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),

    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
});

// Limpia el DOM después de cada prueba
afterEach(() => {
  cleanup();
});
