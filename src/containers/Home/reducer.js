import { SAVE_USER } from "./constants";

const INITIAL_STATE = {
  birthDate: null,
  lifeSpan: 0,
  isLoading: true,
  isPastActive: false
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER:
      return state;
    default:
      return state;
  }
};

export default homeReducer;
