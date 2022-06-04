import React from "react";

export default function Filter({ handleClick, category, isActive }) {
  return (
    <span
      className={`category ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {category}
    </span>
  );
}
