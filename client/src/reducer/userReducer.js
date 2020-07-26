import userActionTypes from "../action-type/user";

export const userReducer = (state, action) => {
  switch (action.type) {
    case userActionTypes.UPDATE_USER: {
      return {
        profile: action.payload.profile,
        posts: action.payload.posts,
      };
    }
    case userActionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        profile: action.payload.profile,
      };
    }
    case userActionTypes.UPDATE_POSTS: {
      state.posts.unshift(action.payload.post);
      return state;
    }
    case userActionTypes.DELETE_USER: {
      return null;
    }
    default:
      return state;
  }
};
