import React from "react";
import { HomeIconProps } from "./Home.types";

export const Home: React.FC<HomeIconProps> = ({
  strokeWidth = 2,
  size = 24,
  color = "white",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.66667 20.6667H6.55556C6.143 20.6667 5.74733 20.4911 5.45561 20.1785C5.16389 19.866 5 19.442 5 19V9.83333L12 4L19 9.83333V19C19 19.442 18.8361 19.866 18.5444 20.1785C18.2527 20.4911 17.857 20.6667 17.4444 20.6667H14.3333"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.66669 20.6667V13.1667H14.3334V20.6667"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
