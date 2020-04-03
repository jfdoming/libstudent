export const addCourse = (dispatch) => (name) =>
  dispatch({ type: "ADD_COURSE", payload: name });

export const setCurrentCourse = (dispatch) => (newCourse) =>
  dispatch({ type: "SET_CURRENT_COURSE", payload: newCourse });

export const deleteCurrentCourse = (dispatch) => () =>
  dispatch({ type: "DELETE_CURRENT_COURSE" });

export const hydrate = (dispatch, persistedState) =>
  dispatch({ type: "HYDRATE", payload: persistedState });
