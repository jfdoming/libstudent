import React, { useMemo, useRef, useState } from "react";
import SortableTable from "../components/SortableTable";

const EntryEdit = ({
  entries,
  setEntries,
  initialNewEntry,
  bodyHeader,
  ...props
}) => {
  const [id, setId] = useState(entries ? entries.length : -1);
  const [newEntry, setNewEntry] = useState(initialNewEntry(id));
  const setInNewEntry = (key) => (e) => {
    const value = e.target.value;
    setNewEntry((entry) => ({ ...entry, [key]: value }));
  };

  const onSubmit = useRef();
  onSubmit.current = (e) => {
    e.preventDefault();

    if (!entries) return;

    setEntries([...entries, newEntry]);
    setNewEntry({ ...newEntry, id: newEntry.id + 1 });
    setId((oldId) => oldId + 1);
  };

  const Form = useMemo(
    () => ({ children }) => (
      <form onSubmit={(...args) => onSubmit.current(...args)}>{children}</form>
    ),
    []
  );

  return (
    <SortableTable
      {...props}
      data={entries || []}
      setData={setEntries}
      bodyHeader={bodyHeader(newEntry, setInNewEntry).map((el, index) => (
        <Form key={index}>{el}</Form>
      ))}
    />
  );
};

export default EntryEdit;
