import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";

describe("Home", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
