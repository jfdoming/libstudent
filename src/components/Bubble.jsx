import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  bubble: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 10,
    boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.15)",
    padding: "1em",

    "&> *:not(:first-child)": {
      marginLeft: "1rem",
    },
  },
});

const Bubble = ({ children, className = "", ...props }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.bubble} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Bubble;
