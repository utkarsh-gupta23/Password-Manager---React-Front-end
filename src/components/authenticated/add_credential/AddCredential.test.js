import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddCredentialForm from "./AddCredential";
import { ToastContext } from "../../../context/ToastContext";
import { useCredentailContext } from "../../../hooks/useCredentialContext";
import axios from "axios";
import { API_URL } from "../../../constants";
import "@testing-library/jest-dom";

// Mock the axios module
jest.mock("axios");

// Mock the useCredentialContext hook
jest.mock("../../../hooks/useCredentialContext", () => ({
  useCredentailContext: jest.fn(),
}));

describe("AddCredentialForm", () => {
  let dispatch;
  let showSnackbar;

  beforeEach(() => {
    dispatch = jest.fn();
    showSnackbar = jest.fn();

    useCredentailContext.mockReturnValue({ dispatch });

    render(
      <ToastContext.Provider value={{ dispatch: showSnackbar }}>
        <AddCredentialForm />
      </ToastContext.Provider>
    );
  });

  test("renders form inputs and buttons", () => {
    // Check that all form inputs and buttons are rendered
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /clear all/i })
    ).toBeInTheDocument();
  });

  test("validates form inputs on submit", () => {
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/website is required/i)).toBeInTheDocument();
  });

  test("submits form when all fields are valid", async () => {
    axios.post.mockResolvedValue({ status: 201, data: { credential: {} } });

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Sample Title" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "sampleUser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "samplePassword" },
    });
    fireEvent.change(screen.getByLabelText(/website/i), {
      target: { value: "http://example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(axios.post).toHaveBeenCalledWith(
      `${API_URL}/credentials`,
      {
        credential: {
          title: "Sample Title",
          username: "sampleUser",
          password: "samplePassword",
          website: "http://example.com",
        },
      },
      { withCredentials: true }
    );
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalled();
      expect(showSnackbar).toHaveBeenCalledWith({
        type: "SUCCESS",
        payload: "Credential Added Successfully",
      });
    });
  });

  test("clears all fields when Clear All button is clicked", () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Sample Title" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "sampleUser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "samplePassword" },
    });
    fireEvent.change(screen.getByLabelText(/website/i), {
      target: { value: "http://example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /clear all/i }));

    expect(screen.getByLabelText(/title/i).value).toBe("");
    expect(screen.getByLabelText(/username/i).value).toBe("");
    expect(screen.getByLabelText(/password/i).value).toBe("");
    expect(screen.getByLabelText(/website/i).value).toBe("");
  });
});
