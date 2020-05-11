import { createStore } from "redux";
import { combineReducers } from "redux";

const actionTypes = {
  HIDE_INTRODUCTION: "HIDE_INTRODUCTION",
};

export const hideIntroduction = () => ({
  type: actionTypes.HIDE_INTRODUCTION,
  payload: {},
});

const initialState = {
  isShowingIntroduction: true,
};
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HIDE_INTRODUCTION:
      return {
        ...state,
        isShowingIntroduction: false,
      };
    default:
      return state;
  }
};
export default createStore(combineReducers({ game: gameReducer }));
