import userActionTypes from "../action-type/user";

export const userReducer = (state, action) => {
  switch (action.type) {
    case userActionTypes.UPDATE_USER: {
      return action.payload;
    }
    case userActionTypes.DELETE_USER: {
      return null;
    }
    default:
      return state;
  }
};
