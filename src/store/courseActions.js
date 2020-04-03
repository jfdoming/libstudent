export const setCurrentAssessment = (dispatch) => (newAssessment) =>
  dispatch({ type: "SET_CURRENT_ASSESSMENT", payload: newAssessment });

export const addAssessment = (dispatch) => (newAssessment) =>
  dispatch({ type: "ADD_ASSESSMENT", payload: newAssessment });

export const deleteCurrentAssessment = (dispatch) => () =>
  dispatch({ type: "DELETE_CURRENT_ASSESSMENT" });

export const setAssessmentEntries = (dispatch) => (newEntries) =>
  dispatch({ type: "SET_CURRENT_ASSESSMENT_ENTRIES", payload: newEntries });

export const setGradingSchemeEntries = (dispatch) => (newGradingSchemes) =>
  dispatch({
    type: "SET_CURRENT_GRADING_SCHEME_ENTRIES",
    payload: newGradingSchemes,
  });

export const setCurrentGradingScheme = (dispatch) => (newGradingScheme) =>
  dispatch({ type: "SET_CURRENT_GRADING_SCHEME", payload: newGradingScheme });

export const addGradingScheme = (dispatch) => (newGradingScheme) =>
  dispatch({ type: "ADD_GRADING_SCHEME", payload: newGradingScheme });

export const deleteCurrentGradingScheme = (dispatch) => () =>
  dispatch({ type: "DELETE_CURRENT_GRADING_SCHEME" });
