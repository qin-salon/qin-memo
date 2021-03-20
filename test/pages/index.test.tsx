import { render } from "@testing-library/react";
import Index from "src/pages";

describe("Index page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Index />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
