import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import "@testing-library/jest-dom";

jest.mock("../../../hooks/useAuthContext");
jest.mock("../../../hooks/useLogout");
jest.mock("react-router-dom", () => ({
  //get back rest actual implementation,
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mock only the useNavigate hook
}));

describe("Navbar", () => {
  const mockNavigate = jest.fn();
  const mockOpenModal = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    useAuthContext.mockReturnValue({ user: { display_name: "John Doe" } });
    useLogout.mockReturnValue({ logout: mockLogout });
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <Navbar openModal={mockOpenModal} />
      </MemoryRouter>
    );
  });

  test("renders the Navbar with all options", () => {
    expect(screen.getByText("Credentials")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Add Credential")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test('navigates to credentials page when "Credentials" is clicked', () => {
    fireEvent.click(screen.getByText("Credentials"));
    expect(mockNavigate).toHaveBeenCalledWith("");
  });

  test('navigates to edit profile page when "Edit Profile" is clicked', () => {
    fireEvent.click(screen.getByText("John Doe"));
    expect(mockNavigate).toHaveBeenCalledWith("edit-profile");
  });

  test('opens modal when "Add Credential" is clicked', () => {
    fireEvent.click(screen.getByText("Add Credential"));
    expect(mockNavigate).toHaveBeenCalledWith("");
    expect(mockOpenModal).toHaveBeenCalled();
  });

  test('calls logout when "Logout" is clicked', () => {
    fireEvent.click(screen.getByText("Logout"));
    expect(mockLogout).toHaveBeenCalled();
  });
});
