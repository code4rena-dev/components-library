import clsx from "clsx";
import React from "react";
import { BlogPreviewProps } from "./BlogPreview.types";
import "./BlogPreview.scss";

const extractDomain = (url: string = "") => {
  const httpRemoved = url.replace("http://", "");
  const httpsRemoved = httpRemoved.replace("https://", "");
  const wsRemoved = httpsRemoved.replace("www.", "");
  const parts = wsRemoved.split("/");
  if (parts.length) {
    return parts[0];
  }
  return "";
};

export const BlogPreview: React.FC<BlogPreviewProps> = ({
  imageDisplay,
  textDisplay,
  row,
  wide,
  border,
  link,
  headline,
  text,
  imageUrl,
}) => {
  return (
    <div
      className={clsx(
        "postcard",
        imageDisplay && "postcard--display",
        wide && "postcard--wide",
        row && "postcard--row",
        border && "postcard--border"
      )}
    >
      <div
        className={clsx(
          "postcard--top",
          imageDisplay && "postcard--top--display",
          row && "postcard--top--row"
        )}
      >
        <a href={link} target="_blank" rel="noreferrer noopener">
          <img
            className={clsx(
              "postcard--image",
              imageDisplay && "postcard--image--display"
            )}
            src={imageUrl}
            alt={headline}
          />
        </a>
      </div>

      <div className={clsx("postcard--bottom", row && "postcard--bottom--row")}>
        <p className="postcard--link">{extractDomain(link)}</p>
        <a
          className="postcard--headline"
          href={link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {headline}
        </a>
        {text && (
          <p
            className={clsx(
              "postcard--text",
              textDisplay && "postcard--text--display"
            )}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
};
