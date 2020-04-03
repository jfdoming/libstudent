import React, { useEffect, useReducer, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

import Button from "./components/Button";
import EntryManage from "./sections/EntryManage";
import SchemeEdit from "./sections/SchemeEdit";
import AssessmentEdit from "./sections/AssessmentEdit";
import SimpleModal from "./components/SimpleModal";
import { init, rootReducer } from "./store/rootReducer";
import {
  addCourse,
  deleteCurrentCourse,
  hydrate,
  setCurrentCourse,
} from "./store/rootActions";
import {
  setCurrentAssessment,
  addAssessment,
  deleteCurrentAssessment,
  setAssessmentEntries,
  setGradingSchemeEntries,
} from "./store/courseActions";
import {
  getAssessments,
  getGradingSchemes,
  getCurrentCourse,
  getCurrentAssessmentEntries,
  getCurrentGradingSchemeEntries,
} from "./store/selectors";
import {
  addGradingScheme,
  deleteCurrentGradingScheme,
  setCurrentGradingScheme,
} from "./store/courseActions";
import Bubble from "./components/Bubble";
import Input from "./components/Input";
import Heap from "./utils/Heap";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  app: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  withMargin: {
    marginRight: "1rem",
    marginBottom: "1rem",
  },
});

const persist = (state) => () => {
  localStorage.setItem("appState", JSON.stringify(state));
  toast.success("Successfully saved.");
};

const Divider = () => (
  <div style={{ flexBasis: "100%", marginBottom: "1em" }} />
);

const sumAssessment = (assessment, dropWorst, missingScore = null) => {
  const markHeap = new Heap(
    assessment.entries
      .filter(({ max }) => missingScore !== null || +max)
      .map(({ score, max }) => ({
        score,
        max,
        percentage: +max ? +score / +max : missingScore,
      })),
    "percentage"
  );
  for (let i = 0; i < dropWorst; ++i) {
    markHeap.deleteMin();
  }

  const remaining = markHeap.getAll();
  const totalScore = remaining.reduce(
    (rror, { percentage }) => rror + percentage,
    0
  );
  return {
    count: remaining.length,
    score: remaining.length ? totalScore / remaining.length : 0,
  };
};

const calculateTotals = (
  missingScore,
  assessments = [],
  gradingSchemeEntries = []
) => {
  const { score, max, bonusScore, bonusMax } = gradingSchemeEntries.reduce(
    (rror, { name, weight, dropWorst, bonus }) => {
      const { count, score } = sumAssessment(
        assessments[name],
        dropWorst,
        missingScore
      );
      const isBonus = "" + bonus === "true";
      const shouldCount = count !== 0;
      return {
        score:
          rror.score +
          +weight * !isBonus * (shouldCount ? score : missingScore || 0),
        max:
          rror.max +
          +weight * !isBonus * (shouldCount || missingScore !== null),
        bonusScore: rror.bonusScore + +weight * isBonus * score,
        bonusMax: rror.bonusMax + +weight * !isBonus,
      };
    },
    { score: 0, max: 0, bonusScore: 0, bonusMax: 0 }
  );
  return (
    (max ? ((score / max + bonusScore / bonusMax) * 100).toFixed(2) : "??.??") +
    "%"
  );
};

const Analytics = ({ assessments, gradingSchemeEntries }) => {
  const percentCurrent = calculateTotals(
    null,
    assessments,
    gradingSchemeEntries
  );

  const [target, setTarget] = useState(100);
  return (
    <Bubble direction="column">
      If you want your mark to stay the same, you should get an average of{" "}
      {percentCurrent} on your remaining assessments.
      <br />
      <span>
        If you get an average of{" "}
        <Input
          type="number"
          variant="extraSmall"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />{" "}
        , your final grade will be{" "}
        {calculateTotals(target / 100, assessments, gradingSchemeEntries)}.
      </span>
    </Bubble>
  );
};

const App = () => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(rootReducer, undefined, init);
  useEffect(() => {
    const persistedState = localStorage.getItem("appState");
    if (!persistedState) return;
    hydrate(dispatch, JSON.parse(persistedState));
  }, []);

  const assessmentModal = useRef();
  const gradingSchemeModal = useRef();

  return (
    <div className={classes.app}>
      <Button text="Save" onClick={persist(state)} />
      <SimpleModal
        trigger={assessmentModal}
        variant="small"
        title="Edit assessment"
        confirmText="OK"
      >
        <AssessmentEdit
          assessments={getCurrentAssessmentEntries(state)}
          setAssessments={setAssessmentEntries(dispatch)}
        />
      </SimpleModal>
      <SimpleModal
        trigger={gradingSchemeModal}
        variant="small"
        title="Edit grading scheme"
        confirmText="OK"
      >
        <SchemeEdit
          assessments={getAssessments(state)}
          schemes={getCurrentGradingSchemeEntries(state)}
          setSchemes={setGradingSchemeEntries(dispatch)}
        />
      </SimpleModal>
      <Divider />
      <EntryManage
        entries={state.courses}
        currentEntry={state.currentCourse}
        addEntry={addCourse(dispatch)}
        setCurrentEntry={setCurrentCourse(dispatch)}
        deleteCurrentEntry={deleteCurrentCourse(dispatch)}
        name="course"
        placeholder="e.g. MATH 135"
      />
      <Divider />
      <EntryManage
        entries={getAssessments(state)}
        currentEntry={getCurrentCourse(state)?.currentAssessment}
        addEntry={addAssessment(dispatch)}
        editEntry={assessmentModal.current}
        setCurrentEntry={setCurrentAssessment(dispatch)}
        deleteCurrentEntry={deleteCurrentAssessment(dispatch)}
        name="assessment"
        placeholder="e.g. Quizzes"
      />
      <Divider />
      <EntryManage
        entries={getGradingSchemes(state)}
        currentEntry={getCurrentCourse(state)?.currentGradingScheme}
        addEntry={addGradingScheme(dispatch)}
        editEntry={gradingSchemeModal.current}
        setCurrentEntry={setCurrentGradingScheme(dispatch)}
        deleteCurrentEntry={deleteCurrentGradingScheme(dispatch)}
        name="grading scheme"
        placeholder="e.g. Scheme A"
      />
      <Divider />
      <Analytics
        assessments={getAssessments(state)}
        gradingSchemeEntries={getCurrentGradingSchemeEntries(state)}
      />
    </div>
  );
};

export default App;
