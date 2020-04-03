import { courseReducer, init as courseInit } from "./courseReducer";

export const rootReducer = (state, action) => {
  if (action.type === "HYDRATE") {
    return action.payload;
  }

  if (action.type === "SET_CURRENT_COURSE") {
    if (!state.courses[action.payload]) {
      return state;
    }
    return { ...state, currentCourse: action.payload };
  }
  if (action.type === "ADD_COURSE") {
    return {
      ...state,
      courses: [...state.courses, courseInit(action.payload)],
      currentCourse: state.courses.length,
    };
  }

  if (!state.courses[state.currentCourse]) {
    return state;
  }

  if (action.type === "DELETE_CURRENT_COURSE") {
    const newCurrentCourse =
      state.courses.length <= 1 ? -1 : Math.max(state.currentCourse - 1, 0);
    const newCourses = [...state.courses];
    newCourses.splice(state.currentCourse, 1);
    return { ...state, courses: newCourses, currentCourse: newCurrentCourse };
  }

  const newState = { ...state };
  newState.courses[state.currentCourse] = courseReducer(
    state.courses[state.currentCourse],
    action
  );
  return newState;
};

export const init = () => ({
  courses: [courseInit("AMATH 250"), courseInit("MATH 235")],
  currentCourse: 0, //-1,
});
