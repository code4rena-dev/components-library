import React, { cloneElement } from "react";
import { AvatarProps } from "./Avatar.types";
import "./Avatar.scss";

// Parse the initials of the user from their name
const parseInitials = (name: string) => {
  if (!name) return "✷"; // If no name then return "✷"
  if (name.length <= 2) return name; // If name is 2 characters or less then return it whole
  if (name.substring(0, 2).toLowerCase() === "0x") name = name.substring(2); // If starts with "0x" then remove it
  let nameArray = name.split(" "); // Initials by 'space' separator
  if (nameArray.length <= 1) nameArray = name.split("."); // Initials by 'dot' separator
  if (nameArray.length <= 1) nameArray = name.split("_"); // Initials by 'underscore' separator
  if (nameArray.length <= 1) nameArray = name.split("-"); // Initials by 'dash' separator
  if (nameArray.length <= 1) {
    const nameString = name.replace(/([A-Z])/g, " $1").trim(); // Initials by case-change
    nameArray = nameString.split(" ");
  }
  if (nameArray.length <= 1) return name.substring(0, 1); // Fallback to first letter of name
  return `${nameArray[0].substring(0, 1)}${nameArray[1].substring(0, 1)}`;
};

// Array of dark pastel colors suitable as bg for the white initials
const pastelColors = [
  "#9B4DCA",
  "#8E44AD",
  "#2980B9",
  "#3498DB",
  "#1ABC9C",
  "#16A085",
  "#27AE60",
  "#2ECC71",
  "#F1C40F",
  "#F39C12",
  "#E67E22",
  "#D35400",
  "#E74C3C",
  "#C0392B",
  "#EC407A",
  "#D81B60",
  "#8E24AA",
  "#6A1B9A",
  "#4A148C",
  "#4527A0",
];

// Generate a random color from the name string
const generateColor = (str: string) => {
  const index = str.length % pastelColors.length;
  return pastelColors[index];
};

/** @deprecated */
export const Avatar = ({
  imgElement,
  name,
  size,
  round,
}: AvatarProps) => {
  const clonedImgElement = imgElement
    ? cloneElement(imgElement, {
        className: "avatar__image",
        width: size,
        height: size,
      })
    : null;

  return (
    <div
      className={"avatar"}
      style={{
        borderRadius: round ? `${round}px` : "none",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {clonedImgElement ? (
        clonedImgElement
      ) : (
        <div
          className={"avatar__initials"}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: generateColor(name),
          }}
        >
          <span
            className={"avatar__initials-text"}
            style={{
              lineHeight: `${size}px`,
              fontSize: `${size * 0.45}px`,
            }}
          >
            {parseInitials(name)}
          </span>
        </div>
      )}
    </div>
  );
};
