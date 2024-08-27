import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Authenticated from "./Authenticated";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import CredentialList from "./credentials/CredentialList";

const renderEach = (parm = "/") =>
  render(
    <MemoryRouter initialEntries={[parm]}>
      <Authenticated />
    </MemoryRouter>
  );

jest.mock("../../hooks/useAuthContext");
jest.mock("../../hooks/useLogout");
jest.mock("./credentials/CredentialList", () => ({ modal, closeModal }) => (
  <div>Credential List Component</div>
));

describe("Authenciated Page tests", () => {
  beforeEach(() => {
    const mockLogout = jest.fn();

    useAuthContext.mockReturnValue({ user: { display_name: "John Doe" } });
    useLogout.mockReturnValue({ logout: mockLogout });
  });

  test("renders Navbar and routes correctly", () => {
    renderEach();
    expect(screen.getByText("Credentials")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Add Credential")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test('navigates to "Edit Profile" page when "Edit Profile" is clicked', () => {
    renderEach();
    fireEvent.click(screen.getByText("John Doe"));
    expect(screen.getByText("Edit Profile")).toBeInTheDocument(); // Assuming "Edit Your Profile" is part of the EditProfile component
  });

  test("redirects to '/' when an unknown route is accessed", () => {
    renderEach("/unkown");
    expect(screen.getByText("Credential List Component")).toBeInTheDocument(); // Should redirect to the credentials list
  });
});
