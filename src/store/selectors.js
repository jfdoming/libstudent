export const getCurrentCourse = (state) => state.courses[state.currentCourse];

export const getAssessments = (state) =>
  state.courses[state.currentCourse]?.assessments;
export const getGradingSchemes = (state) =>
  state.courses[state.currentCourse]?.gradingSchemes;
export const getCurrentAssessment = (state) =>
  state.courses[state.currentCourse]?.assessments[
    state.courses[state.currentCourse]?.currentAssessment
  ];
export const getCurrentGradingScheme = (state) =>
  state.courses[state.currentCourse]?.gradingSchemes[
    state.courses[state.currentCourse]?.currentGradingScheme
  ];

export const getCurrentAssessmentEntries = (state) =>
  getCurrentAssessment(state)?.entries;
export const getCurrentGradingSchemeEntries = (state) =>
  getCurrentGradingScheme(state)?.entries;
