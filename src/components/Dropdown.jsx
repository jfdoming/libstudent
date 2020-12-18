import React, { useRef, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  dropdownContainer: {
    position: "relative",

    cursor: "pointer",
    userSelect: "none",
    color: "white",
    fontFamily: "inherit",
    fontSize: 13,
  },
  dropdown: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "15ch",
    padding: 10,
    outline: "none",

    border: "1px solid #6C7AE0",
    borderRadius: 5,
    fontWeight: "bold",
    background: "#6C7AE0",
    boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.15)",

    transition:
      "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",

    "&:hover, &:focus": {
      background: "#818CE4",
      border: "1px solid #818CE4",
      boxShadow: "5px 5px 40px 0px rgba(0, 0, 0, 0.3)",
    },

    "&:disabled": {
      background: "#999999",
      border: "1px solid #999999",
      boxShadow: "none",
      cursor: "default",
    },
  },
  label: {
    margin: 0,
    padding: 0,
  },
  arrow: {
    position: "relative",
    top: -1,
  },
  items: {
    position: "absolute",
    top: "calc(20px + 1.8em)",
    left: 0,
    width: "100%",
    zIndex: 1000,
    boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.30)",
    transformOrigin: "50% 0%",
    transform: "scale(0)",
    transition: "transform 0.3s ease",
  },
  openItems: {
    transformOrigin: "0% 0%",
    transform: "scale(1)",
  },
  item: {
    outline: "none",
    background: "#6C7AE0",
    padding: 10,
    wordBreak: "break-word",
    transition:
      "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",

    "&:hover,&:focus": {
      background: "#818CE4",
    },
  },
});

const Dropdown = ({ options, value, setValue, onChange }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const gainingFocus = useRef(false);

  const handleChange = (e) => {
    if (setValue) {
      setValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const inputRefs = useRef([]);

  const handleBlur = () => {
    if (!gainingFocus.current) {
      setOpen(false);
    } else {
      gainingFocus.current = false;
    }
  };

  const handleItemClick = (option) => () => {
    handleChange({ target: { value: option } });

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const handleKeyDown = (i) => (e) => {
    const length = options.length + 1;
    const hasMoreBefore = i > 0;
    const hasMoreAfter = i < length - 1;

    if (!e.ctrlKey && !e.altKey && !e.metaKey) {
      if (e.keyCode === 9 && open) {
        if (hasMoreAfter && !e.shiftKey) {
          gainingFocus.current = true;
          inputRefs.current[i + 1].focus();
          e.preventDefault();
        } else if (hasMoreBefore && e.shiftKey) {
          gainingFocus.current = true;
          inputRefs.current[i - 1].focus();
          e.preventDefault();
        }
      } else if (!e.shiftKey) {
        if (e.keyCode === 40) {
          if (open) {
            gainingFocus.current = true;
            inputRefs.current[(i + 1) % (options.length + 1)].focus();
            e.preventDefault();
          } else {
            e.preventDefault();
            handleItemClick((i + 1) % options.length)();
          }
        } else if (e.keyCode === 38) {
          if (open) {
            gainingFocus.current = true;
            inputRefs.current[
              (i + options.length) % (options.length + 1)
            ].focus();
            e.preventDefault();
          } else {
            e.preventDefault();
            handleItemClick((i + options.length - 1) % options.length)();
          }
        } else if (e.keyCode === 27) {
          if (i === 0) {
            inputRefs.current[i].blur();
          } else {
            inputRefs.current[0].focus();
            setOpen(false);
          }
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div className={classes.dropdownContainer}>
      <div
        className={classes.dropdown}
        tabIndex={0}
        ref={(ref) => {
          inputRefs.current[0] = ref;
          return true;
        }}
        onClick={() => setOpen((oldOpen) => !oldOpen)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown(value)}
        onKeyPress={(e) => {
          if (
            (e.which === 13 || e.which === 32) &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.altKey &&
            !e.metaKey
          ) {
            e.preventDefault();
            setOpen((oldOpen) => !oldOpen);
          }
        }}
      >
        <span className={classes.label}>{options[value]}</span>
        <span className={classes.arrow}>
          &nbsp;&nbsp;{open ? <>&#x25B2;</> : <>&#x25BC;</>}
        </span>
      </div>
      {
        <div className={(open ? classes.openItems + " " : "") + classes.items}>
          {Object.entries(options).map(([id, option], index) => (
            <div
              key={id}
              ref={(ref) => {
                inputRefs.current[index + 1] = ref;
                return true;
              }}
              aria-hidden={open ? "false" : true}
              tabIndex={open ? 0 : -1}
              className={classes.item}
              onMouseDown={() => (gainingFocus.current = true)}
              onKeyDown={handleKeyDown(index + 1)}
              onKeyPress={(e) => {
                if (
                  (e.which === 13 || e.which === 32) &&
                  !e.shiftKey &&
                  !e.ctrlKey &&
                  !e.altKey &&
                  !e.metaKey
                ) {
                  e.preventDefault();
                  handleItemClick(id)();
                }
              }}
              onClick={handleItemClick(id)}
              onBlur={handleBlur}
            >
              {option}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Dropdown;
