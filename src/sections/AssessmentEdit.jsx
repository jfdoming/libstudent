import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import EntryEdit from "./EntryEdit";

const number = (fn) => (e) =>
  fn({ ...e, target: { ...e.target, value: +e.target.value } });

const percent = (score, max) => ((score / max) * 100).toFixed(2) + "%";

const initialNewEntry = (id) => ({
  id,
  name: "",
  score: 0,
  max: 5,
});

const AssessmentEdit = ({ assessments, setAssessments }) => {
  const tableBodyHeader = (newEntry, setInNewEntry) => [
    <Input
      key="name"
      variant="large"
      type="text"
      value={newEntry.name}
      placeholder="e.g. Quiz 1"
      onChange={setInNewEntry("name")}
    />,
    <Input
      key="score"
      type="number"
      step="any"
      value={newEntry.score}
      onChange={setInNewEntry("score")}
      required
    />,
    <Input
      key="max"
      type="number"
      step="any"
      value={newEntry.max}
      onChange={setInNewEntry("max")}
      required
    />,
    "-",
    <Button key="add" text="Add" disabled={!assessments} />,
  ];

  return (
    <EntryEdit
      header={[
        "Name (optional)",
        "Score Achieved",
        "Maximum Score",
        "Percentage Achieved",
      ]}
      keys={["name", "score", "max", "percentage"]}
      render={{
        name: (props) => (
          <Input type="text" variant="large" borderless {...props} />
        ),
        score: ({ onChange, ...props }) => (
          <Input
            type="number"
            step="any"
            borderless
            onChange={number(onChange)}
            {...props}
          />
        ),
        max: ({ onChange, ...props }) => (
          <Input
            type="number"
            step="any"
            borderless
            onChange={number(onChange)}
            {...props}
          />
        ),
        percentage: (props, { score, max }) => percent(score, max),
      }}
      entries={assessments}
      setEntries={setAssessments}
      initialNewEntry={initialNewEntry}
      bodyHeader={tableBodyHeader}
    />
  );
};

export default AssessmentEdit;
