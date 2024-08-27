import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";
import { useCredentailContext } from "../../../hooks/useCredentialContext";
import axios from "axios";
import { API_URL } from "../../../constants";

// Mock necessary modules and hooks
jest.mock("../../../hooks/useCredentialContext");
jest.mock("axios");

describe("Card Component Tests", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useCredentailContext.mockReturnValue({ dispatch: mockDispatch });
    jest.clearAllMocks();
  });

  const cardProps = {
    title: "Test Title",
    username: "testuser",
    password: "testpassword",
    website: "https://example.com",
    id: 1,
  };

  test("renders the Card component with correct content", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("https://example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    render(<Card {...cardProps} />);

    const showButton = screen.getByRole("button", { name: "Show" });
    fireEvent.click(showButton);
    expect(screen.getByDisplayValue("testpassword")).toHaveAttribute(
      "type",
      "text"
    );

    fireEvent.click(screen.getByRole("button", { name: "Hide" }));
    expect(screen.getByDisplayValue("testpassword")).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("handles delete action", async () => {
    axios.delete.mockResolvedValue({
      status: 200,
      data: { credential: cardProps },
    });

    render(<Card {...cardProps} />);

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(axios.delete).toHaveBeenCalledWith(
      `${API_URL}/credentials/${cardProps.id}`,
      { withCredentials: true }
    );
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "DELETE",
        payload: cardProps,
      });
    });
  });

  test("handles save action on EditableCard", async () => {
    axios.put.mockResolvedValue({ status: 200 });

    render(<Card {...cardProps} />);

    const editButton = screen.getByRole("button", { name: "Edit" });
    await act(async () => {
      fireEvent.click(editButton);
    });

    const saveButton = screen.getByText("Save");

    await act(async () => {
      fireEvent.click(saveButton);
    });
    const expectedData = { ...cardProps };
    delete expectedData.id; // Removing id to match the API call expectation

    expect(axios.put).toHaveBeenCalledWith(
      `${API_URL}/credentials/${cardProps.id}`,
      expectedData,
      { withCredentials: true }
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "UPDATE",
        payload: { id: cardProps.id, ...cardProps },
      });
    });
  });

  test("handles cancel action on EditableCard", () => {
    render(<Card {...cardProps} />);

    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Ensure it reverts back to the original Card component
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });
});
