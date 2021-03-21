import { render } from "@testing-library/react";

describe("Test page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<div>test</div>, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
