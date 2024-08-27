import React from "react";

function CustomInput({ value, onChange, placeholder }) {
  return (
    <div>
      <strong>{placeholder}: </strong>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="editable-input"
      />
    </div>
  );
}

export default CustomInput;
