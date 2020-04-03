import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  button: {
    background: "#6C7AE0",
    color: "white",
    border: "1px solid #6C7AE0",
    borderRadius: 5,
    padding: 10,
    display: "inline-block",
    cursor: "pointer",
    userSelect: "none",
    boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.15)",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: "bold",
    outline: "none",

    transition:
      "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",

    "&:hover, &:focus": {
      boxShadow: "5px 5px 40px 0px rgba(0, 0, 0, 0.3)",
      background: "#818CE4",
      border: "1px solid #818CE4",
    },

    "&:disabled": {
      background: "#999999 !important",
      border: "1px solid #999999 !important",
      boxShadow: "none",
      cursor: "default",
    },
  },
  defaultVariant: {},
  dangerVariant: {
    background: "red",
    borderColor: "red",
    "&:hover, &:focus": {
      background: "#FF5252",
      borderColor: "#FF5252",
    },
  },
  goodVariant: {
    background: "green",
    borderColor: "green",
    "&:hover, &:focus": {
      background: "#00A800",
      borderColor: "#00A800",
    },
  },
});

const Button = ({
  variant = "default",
  text = "",
  className = "",
  onClick,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <button
      className={`${classes.button} ${
        classes[variant + "Variant"]
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
