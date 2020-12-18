import React, { useRef, useState } from "react";
import { createUseStyles } from "react-jss";

import Bubble from "../components/Bubble";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import Input from "../components/Input";
import SimpleModal from "../components/SimpleModal";

const useStyles = createUseStyles({
  withMargin: {
    marginRight: "1rem",
  },
});

const EntryManage = ({
  entries,
  addEntry,
  editEntry,
  currentEntry = -1,
  setCurrentEntry,
  deleteCurrentEntry,
  name = "entry",
  placeholder = "",
}) => {
  const classes = useStyles();

  const deleteEntryModal = useRef();

  const [newEntry, setNewEntry] = useState("");

  return (
    <>
      <SimpleModal
        trigger={deleteEntryModal}
        title={`Delete this ${name}?`}
        onConfirm={deleteCurrentEntry}
        easyExitAllowed={false}
      >
        Are you sure you want to delete this {name}? This cannot be undone.
      </SimpleModal>
      <Bubble className={classes.withMargin}>
        <Dropdown
          options={entries?.map(({ name }) => name) || []}
          value={currentEntry}
          setValue={setCurrentEntry}
        />
        <Button
          variant="danger"
          text="Delete"
          onClick={deleteEntryModal.current}
          disabled={currentEntry === -1}
        />
        {editEntry && (
          <Button
            text="Edit"
            onClick={editEntry}
            disabled={currentEntry === -1}
          />
        )}
        <span>- or -</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addEntry(newEntry);
          }}
        >
          <Input
            type="text"
            variant="large"
            className={classes.withMargin}
            placeholder={placeholder}
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            required
          />
          <Button variant="good" text="Add" />
        </form>
      </Bubble>
    </>
  );
};

export default EntryManage;
