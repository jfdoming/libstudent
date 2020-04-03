import React from "react";
import { createUseStyles } from "react-jss";
import Button from "./Button";

const useStyles = createUseStyles({
  x: {
    padding: "1em",
    borderRadius: "50%",
    position: "relative",
    lineHeight: 1,
    fontSize: "inherit",

    "&:after": {
      content: '"x"',
      position: "absolute",
      top: "0.5em",
      left: "0.75em",
    },
  },
});

const XButton = (props) => {
  const classes = useStyles();
  return <Button className={classes.x} {...props} />;
};

export default XButton;
