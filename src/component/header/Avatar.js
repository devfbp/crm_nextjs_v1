import React from "react";

const Avatar = ({ name, size }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  let img_size = "140px";
  let font_size = "48px";
  let fontWeight = "bold";
  if (size) {
    img_size = "30px";
    font_size = `calc(${60} / 2.5)`;
    fontWeight = "normal";
  }
  const avatarStyle = {
    width: img_size,
    height: img_size,
    borderRadius: "50%",
    backgroundColor: "#0d6efd",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: font_size,
    fontWeight: "bold"
  };

  return <div style={avatarStyle}>{firstLetter}</div>;
};

export default Avatar;