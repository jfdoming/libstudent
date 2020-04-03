import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import EntryEdit from "./EntryEdit";

const initialNewEntry = (id) => ({
  id,
  name: -1,
  weight: 0,
  dropWorst: 0,
  bonus: false,
  entries: [],
});

const SchemeEdit = ({ assessments, schemes, setSchemes }) => {
  const tableBodyHeader = (newEntry, setInNewEntry) => [
    <Dropdown
      key="name"
      options={assessments?.map(({ name }) => name) || []}
      value={newEntry.name}
      setValue={(value) => setInNewEntry("name")({ target: { value } })}
    />,
    <Input
      key="weight"
      type="number"
      value={newEntry.weight}
      onChange={setInNewEntry("weight")}
      required
    />,
    <Input
      key="dropWorst"
      type="number"
      value={newEntry.dropWorst}
      onChange={setInNewEntry("dropWorst")}
      required
    />,
    <Input
      key="bonus"
      type="checkbox"
      value={newEntry.bonus}
      onChange={setInNewEntry("bonus")}
    />,
    <Button key="add" text="Add" disabled={!schemes} />,
  ];

  return (
    <EntryEdit
      header={["Name", "Weight", "Drop Worst", "Bonus?"]}
      keys={["name", "weight", "dropWorst", "bonus"]}
      render={{
        name: ({ value, onChange }) => (
          <Dropdown
            options={assessments?.map(({ name }) => name) || []}
            value={value}
            setValue={(value) => onChange({ target: { value } })}
          />
        ),
        weight: (props) => <Input type="number" borderless {...props} />,
        dropWorst: (props) => <Input type="number" borderless {...props} />,
        bonus: (props) => <Input type="checkbox" borderless {...props} />,
      }}
      entries={schemes}
      setEntries={setSchemes}
      initialNewEntry={initialNewEntry}
      bodyHeader={tableBodyHeader}
    />
  );
};

export default SchemeEdit;
