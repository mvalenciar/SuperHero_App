import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "../CustomHeader";

describe("customHeader", () => {
  test("should render the component wit props correctly", () => {
    const title = "test title";
    const description = "test description";

    render(<CustomHeader title={title} description={description} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /test title/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });
});
