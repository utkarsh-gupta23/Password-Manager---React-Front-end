import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import EditableCard from "./EditCard";
const handleSave = jest.fn();
const handleCancel = jest.fn();

const setup = () => {
  return render(
    <EditableCard
      title="Title"
      username="Username"
      password="Test Password"
      website="Test Website"
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

describe("Editable Card tests", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <EditableCard
        title="title"
        username="username"
        password="passkey"
        website="nigga.com"
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
    const passwordElement = getByPlaceholderText("Password");
    const userNameElement = getByPlaceholderText("Username");
    expect(passwordElement.value).toBe("passkey");
    expect(userNameElement.value).toBe("username");
    expect(getByPlaceholderText("Website").value).toBe("nigga.com");
  });
  it("updates state on input change", () => {
    const { getByPlaceholderText } = setup();
    fireEvent.change(getByPlaceholderText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(getByPlaceholderText("Username"), {
      target: { value: "New Username" },
    });
    fireEvent.change(getByPlaceholderText("Website"), {
      target: { value: "New Website" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "New Password" },
    });

    expect(getByPlaceholderText("Title")).toHaveValue("New Title");
    expect(getByPlaceholderText("Username")).toHaveValue("New Username");
    expect(getByPlaceholderText("Website")).toHaveValue("New Website");
    expect(getByPlaceholderText("Password")).toHaveValue("New Password");
  });
  it("toggles password visibility", () => {
    const { getByPlaceholderText, getByText } = render(
      <EditableCard
        title="Test Title"
        username="Test Username"
        password="Test Password"
        website="Test Website"
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );

    const passwordInput = getByPlaceholderText("Password");
    const toggleButton = getByText("Show");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(getByText("Hide")).toBeInTheDocument();

    fireEvent.click(getByText("Hide"));
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(getByText("Show")).toBeInTheDocument();
  });
  it("shows validation errors and prevents save with invalid data", async () => {
    const { findByText, getByText } = render(
      <EditableCard
        title=""
        username=""
        password=""
        website=""
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );

    //try to submit form
    userEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Title is required")).toBeInTheDocument();
      expect(getByText("Username is required")).toBeInTheDocument();
      expect(
        getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
    expect(handleSave).not.toHaveBeenCalled();
  });
});
