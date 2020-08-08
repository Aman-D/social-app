const HOST = "http://localhost:5000";
export const url = {
  get: {
    home: `${HOST}/`,
    profile: `${HOST}/user/profile`,
    allPost: `${HOST}/post/all`,
    recommendation: `${HOST}/user/recommend`,
    following: `${HOST}/user/friend/following/list`,
    ffCount: `${HOST}/user/friend/count`,
    likedPosts: `${HOST}/post/liked-posts`,
  },
  post: {
    newPost: `${HOST}/post/new`,
    updateUser: `${HOST}/user/profile/update`,
    signUp: `${HOST}/auth/signup`,
    logIn: `${HOST}/auth/login`,
    findUser: `${HOST}/user/find`,
    follow: `${HOST}/user/friend/follow`,
    unFollow: `${HOST}/user/friend/unfollow`,
    like: `${HOST}/post/like`,
  },
};
