import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePagination } from "../../hooks/usePagination";
import { HeroesGrid } from "../HeroesGrid";

import type { HeroPaginationController } from "../HeroPaginationController";
import { createMockHero } from "../../test/superhero.factory";

const mockHeroes = Array.from({ length: 20 }, (_, index) =>
  createMockHero({
    id: index,
    name: `Hero ${index}`,
  }),
);

vi.mock("../HeroCard", () => ({
  HeroCard: () => <div data-testid="hero-card" />,
}));

type HeroPaginationControllerProps = React.ComponentProps<
  typeof HeroPaginationController
>;

const paginationControllerMock = vi.fn();
vi.mock("../HeroPaginationController", () => ({
  HeroPaginationController: (props: HeroPaginationControllerProps) => {
    paginationControllerMock(props);
    return <div data-testid="pagination-controller" />;
  },
}));

vi.mock("../../hooks/usePagination", () => ({
  usePagination: vi.fn(),
}));

const mockedUsePagination = vi.mocked(usePagination);

describe("HeroesGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUsePagination.mockReturnValue({
      totalPages: 5,
      currentPage: 1,
      startIndex: 0,
      endIndex: 3,
      changeToNextPage: vi.fn(),
      changeToPrevPage: vi.fn(),
      setCurrentPage: vi.fn(),
    });
  });
  test("should render hero cards based on the pagination range", () => {
    //
    render(<HeroesGrid heroes={mockHeroes} from="/" />);

    expect(screen.getAllByTestId("hero-card")).toHaveLength(3);
  });

  test("should render controller pagination", () => {
    //
    render(<HeroesGrid heroes={mockHeroes} from="/" />);

    expect(screen.getByTestId("pagination-controller")).toBeInTheDocument();
  });

  test("should render pagination controller with specific properties", () => {
    //
    render(<HeroesGrid heroes={mockHeroes} from="/" />);

    expect(paginationControllerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        totalPages: 5,
        currentPage: 1,
        pagesPerGroup: 5,
      }),
    );
  });
});
