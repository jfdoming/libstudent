import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  bubble: {
    display: "flex",
    flexDirection: ({ row }) => (row ? "row" : "column"),
    alignItems: ({ center }) => (center ? "center" : "left"),

    borderRadius: 10,
    boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.15)",
    padding: "1em",

    "&> *:not(:first-child)": {
      marginLeft: ({ row }) => (row ? "1rem" : undefined),
    },
  },
});

const Bubble = ({
  children,
  className = "",
  direction = "row",
  center = true,
  ...props
}) => {
  const classes = useStyles({ row: direction === "row", center });
  return (
    <div className={`${classes.bubble} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Bubble;
