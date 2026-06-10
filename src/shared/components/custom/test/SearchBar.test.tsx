import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "../SearchBar";
import userEvent from "@testing-library/user-event";

const onQueryMock = vi.fn();

const setupRenderSearchBar = () => {
  render(<SearchBar onQuery={onQueryMock} placeholder="search" />);
  return {
    input: screen.getByPlaceholderText(/search/i) as HTMLInputElement,
    button: screen.getByRole("button", { name: /buscar/i }),
    user: userEvent.setup(),
  };
};

describe("searchBar", () => {
  test("should render the component correctly", () => {
    const { input, button } = setupRenderSearchBar();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("should call onQuery with the input value when button search is clicked", async () => {
    const { input, button, user } = setupRenderSearchBar();

    await user.type(input, "superman");
    await user.click(button);

    expect(onQueryMock).toHaveBeenCalledTimes(1);
    expect(onQueryMock).toHaveBeenCalledWith("superman");
  });

  test("should call onQuery when Enter key is pressed", async () => {
    const { input, user } = setupRenderSearchBar();

    await user.type(input, "superman{enter}");

    expect(onQueryMock).toHaveBeenCalledTimes(1);
    expect(onQueryMock).toHaveBeenCalledWith("superman");
  });

  test("should not call onQuery when Enter is not pressed", async () => {
    const { input, user } = setupRenderSearchBar();

    await user.type(input, "superman");

    expect(onQueryMock).not.toHaveBeenCalled();
  });

  test("should trim query before calling onQuery", async () => {
    const { input, button, user } = setupRenderSearchBar();

    await user.type(input, "   superman   ");
    await user.click(button);

    expect(onQueryMock).toHaveBeenCalledWith("superman");
  });

  test("should clear input after search", async () => {
    const { input, button, user } = setupRenderSearchBar();

    await user.type(input, "superman");
    await user.click(button);

    expect(input.value).toBe("");
  });
});
