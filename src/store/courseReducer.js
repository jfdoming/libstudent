const handleSetCurrent = (id) => {
  const currentId = `current${id[0].toUpperCase()}${id.slice(1, -1)}`;
  return (state, action) => {
    if (!state[id][action.payload]) {
      return state;
    }
    return { ...state, [currentId]: action.payload };
  };
};

const handleAdd = (id) => {
  const upperId = id[0].toUpperCase() + id.slice(1, -1);
  const currentId = `current${upperId}`;
  const nextIdId = `next${upperId}Id`;
  return (state, action) => ({
    ...state,
    [id]: [
      ...state[id],
      {
        id: state[nextIdId],
        name: action.payload,
        entries: [],
      },
    ],
    [nextIdId]: state[nextIdId] + 1,
    [currentId]: state[id].length,
  });
};

const handleDelete = (id) => {
  const currentId = `current${id[0].toUpperCase()}${id.slice(1, -1)}`;
  return (state) => {
    if (!state[id][state[currentId]]) {
      return state;
    }

    const newCurrentEntry =
      state[id].length <= 1 ? -1 : Math.max(state[currentId] - 1, 0);
    const newEntries = [...state[id]];
    newEntries.splice(state[currentId], 1);
    return {
      ...state,
      [id]: newEntries,
      [currentId]: newCurrentEntry,
    };
  };
};

const handleSetEntries = (id) => {
  const currentId = `current${id[0].toUpperCase()}${id.slice(1, -1)}`;
  return (state, action) => {
    if (!state[id][state[currentId]]) {
      return state;
    }

    const newEntries = [...state[id]];
    if (typeof action.payload === "function") {
      newEntries[state[currentId]].entries = action.payload(
        newEntries[state[currentId]].entries
      );
    } else {
      newEntries[state[currentId]].entries = action.payload;
    }
    return {
      ...state,
      [id]: newEntries,
    };
  };
};

const noop = (state) => state;

const split = (handlers, fallback = noop) => (state, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : fallback(state, action);
};

export const courseReducer = split({
  SET_CURRENT_ASSESSMENT: handleSetCurrent("assessments"),
  SET_CURRENT_GRADING_SCHEME: handleSetCurrent("gradingSchemes"),
  ADD_ASSESSMENT: handleAdd("assessments"),
  ADD_GRADING_SCHEME: handleAdd("gradingSchemes"),
  DELETE_CURRENT_ASSESSMENT: handleDelete("assessments"),
  DELETE_CURRENT_GRADING_SCHEME: handleDelete("gradingSchemes"),
  SET_CURRENT_ASSESSMENT_ENTRIES: handleSetEntries("assessments"),
  SET_CURRENT_GRADING_SCHEME_ENTRIES: handleSetEntries("gradingSchemes"),
});

export const init = (name = "") => ({
  name,
  assessments: [],
  gradingSchemes: [],
  nextAssessmentId: 0,
  currentAssessment: -1,
  currentGradingScheme: -1,
});
