import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  input: {
    display: "inline",
    border: (props) =>
      props.borderless ? "1px solid transparent" : "1px solid #CCCCCC",
    background: (props) => (props.borderless ? "transparent" : "white"),
    borderRadius: 5,
    padding: 5,
    fontFamily: "inherit",
    fontSize: 13,
    outline: "none",

    transition:
      "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",

    "&:hover": {
      border: "1px solid #CCCCCC",
    },

    "&:focus": {
      border: "1px solid #999999",
      background: "white",
    },
  },
  extraSmall: {
    width: "7.5ch",
  },
  small: {
    width: "10ch",
  },
  large: {
    width: "20ch",
  },
});

const Input = ({
  type,
  variant = "extraSmall",
  borderless = false,
  noDrag = true,
  initialValue,
  className = "",
  value,
  ...props
}) => {
  const classes = useStyles({ borderless });
  let realClassName = classes.input + " " + classes[variant] + " " + className;

  const [internalValue, setValue] = useState(initialValue);

  const inputRef = useRef();

  useEffect(() => {
    if (!noDrag) return;
    if (!inputRef.current) return;

    // Make sure drag events don't bubble.
    inputRef.current.addEventListener("pointerdown", (e) =>
      e.stopPropagation()
    );
  });

  const trueValue = typeof value !== "undefined" ? value : internalValue;

  return (
    <input
      type={type}
      ref={inputRef}
      className={realClassName}
      value={trueValue}
      checked={type === "checkbox" ? "" + trueValue === "true" : undefined}
      onChange={(e) =>
        setValue(type === "checkbox" ? e.target.checked : e.target.value)
      }
      {...props}
    />
  );
};

export default Input;
