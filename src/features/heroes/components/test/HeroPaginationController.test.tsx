import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroPaginationController } from "../HeroPaginationController";
import userEvent from "@testing-library/user-event";

const mockChangeToNextPage = vi.fn();
const mockChangeToPrevPage = vi.fn();
const mockSetCurrentPage = vi.fn();

const renderPaginationController = ({
  totalPages = 20,
  currentPage = 1,
  pagesPerGroup = 5,
}) =>
  render(
    <HeroPaginationController
      totalPages={totalPages}
      currentPage={currentPage}
      pagesPerGroup={pagesPerGroup}
      nextPage={mockChangeToNextPage}
      prevPage={mockChangeToPrevPage}
      setPage={mockSetCurrentPage}
    />,
  );

describe("HeroPaginationController", () => {
  test("should render five page link controller", () => {
    renderPaginationController({});
    expect(screen.getAllByLabelText("item-link")).toHaveLength(5);
  });

  test("should render only available pages when total pages is less than pages per group", () => {
    renderPaginationController({
      totalPages: 3,
      currentPage: 1,
      pagesPerGroup: 5,
    });

    expect(screen.getAllByLabelText("item-link")).toHaveLength(3);
  });

  test("should not render ellipsis when all pages fit in a single group", () => {
    renderPaginationController({
      totalPages: 5,
      currentPage: 1,
      pagesPerGroup: 5,
    });

    expect(screen.queryByLabelText("item-ellipsis")).not.toBeInTheDocument();
  });

  test("should render only final ellipsis when current page is in first group", () => {
    renderPaginationController({
      totalPages: 20,
      currentPage: 1,
    });

    expect(screen.getAllByLabelText("item-ellipsis")).toHaveLength(1);
  });

  test("should render only initial ellipsis when current page is in last group", () => {
    renderPaginationController({
      totalPages: 20,
      currentPage: 18,
    });

    expect(screen.getAllByLabelText("item-ellipsis")).toHaveLength(1);
  });

  test("It should represent two ellipsis when the total number of pages is greater than 5 and less than total pages", () => {
    renderPaginationController({ totalPages: 20, currentPage: 6 });
    expect(screen.getAllByLabelText("item-ellipsis")).toHaveLength(2);
  });
  test("should apply correctly styles when page link component is active", () => {
    renderPaginationController({ currentPage: 2 });

    expect(screen.getByText("2")).toHaveClass("bg-primary");
    expect(screen.getByText("2")).toHaveClass("text-primary-foreground");
    expect(screen.getByText("2")).toHaveClass("shadow-md");
    expect(screen.getByText("2")).toHaveClass("scale-105");
  });

  test("should apply inactive styles to non current pages", () => {
    renderPaginationController({ currentPage: 2 });

    expect(screen.getByText("1")).toHaveClass("bg-muted/40");
    expect(screen.getByText("1")).toHaveClass("text-foreground");
  });

  test("should call setPage a page link is clicked", async () => {
    const user = userEvent.setup();

    renderPaginationController({});

    const pageControllerLinkThree = screen.getByText("3");

    await user.click(pageControllerLinkThree);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
    expect(mockSetCurrentPage).toHaveBeenCalledTimes(1);
  });

  test("should change to next page when button next is clicked", async () => {
    const user = userEvent.setup();

    renderPaginationController({});

    const buttonNext = screen.getByRole("button", { name: "button-next" });
    await user.click(buttonNext);
    expect(mockChangeToNextPage).toHaveBeenCalledOnce();
  });

  test("should change to prev page when button prev is clicked", async () => {
    const user = userEvent.setup();

    renderPaginationController({ currentPage: 3 });

    const buttonPrev = screen.getByRole("button", { name: "button-prev" });
    await user.click(buttonPrev);
    expect(mockChangeToPrevPage).toHaveBeenCalledOnce();
  });
});
