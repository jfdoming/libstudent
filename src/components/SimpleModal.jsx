import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";

import Button from "./Button";

const FADE_IN_TIME = 150;
const FADE_OUT_TIME = 250;

const useStyles = createUseStyles({
  "@global": {
    ".ReactModal__Overlay": {
      opacity: 0,
      transition: `opacity ${FADE_IN_TIME}ms ease-in-out`,
    },

    ".ReactModal__Overlay--after-open": {
      opacity: 1,
    },

    ".ReactModal__Overlay--before-close": {
      transition: `opacity ${FADE_OUT_TIME}ms ease-in-out`,
      opacity: 0,
    },
  },
  modalTitle: {
    margin: 0,
    lineHeight: 1,
  },
  modalContent: {},
  defaultModalContent: {
    minWidth: "64ch",
    marginTop: "1em",
  },
  smallModalContent: {
    minWidth: "32ch",
    marginTop: "2em",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "2em",
  },
  noButton: {
    width: "10ch",
    background: "white",
    color: "black",
    boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.10)",
    "&:hover,&:focus": {
      background: "white",
      border: "1px solid black",
      boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.20)",
    },
    marginRight: "1.5em",
  },
  yesButton: {
    width: "10ch",
  },
});

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    width: "fit-content",
    height: "fit-content",
    margin: "auto",
    boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.40)",
    padding: "1.5em",
  },
};

const SimpleModal = ({
  trigger,
  onConfirm,
  onCancel,
  title,
  children,
  confirmText = "Yes",
  cancelText = "No",
  variant = "default",
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    trigger.current = () => setOpen(true);
  }, [trigger]);

  const handleCancel = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setOpen(false);
  };

  return (
    <Modal
      style={modalStyles}
      isOpen={open}
      contentLabel={title}
      closeTimeoutMS={FADE_OUT_TIME}
    >
      <h2 className={classes.modalTitle}>{title}</h2>
      <div
        className={`${classes.modalContent} ${
          classes[`${variant}ModalContent`]
        }`}
      >
        {children}
      </div>
      <div className={classes.buttons}>
        {(onConfirm || onCancel) && (
          <Button
            className={classes.noButton}
            text={cancelText}
            onClick={handleCancel}
          />
        )}
        <Button
          className={classes.yesButton}
          text={confirmText}
          onClick={handleConfirm}
        />
      </div>
    </Modal>
  );
};

export default SimpleModal;
