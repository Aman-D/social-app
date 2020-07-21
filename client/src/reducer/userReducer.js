import userActionTypes from "../action-type/user";

export const userReducer = (state, action) => {
  switch (action.type) {
    case userActionTypes.UPDATE_USER: {
      return action.payload;
    }

    default:
      return state;
  }
};
