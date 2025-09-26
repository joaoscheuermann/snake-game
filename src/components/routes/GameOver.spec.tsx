import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import GameOver from "./GameOver";

describe("GameOver", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <GameOver />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
