import SearchBox from "./SearchBox";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

describe("Search Box tests", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(<SearchBox />);
    const inputElement = getByPlaceholderText("Search");
    expect(inputElement).toBeInTheDocument();
  });

  it("starts with an empty field", () => {
    const { getByPlaceholderText } = render(<SearchBox />);
    const inputElement = getByPlaceholderText("Search");
    expect(inputElement.value).toBe("");
  });
});
