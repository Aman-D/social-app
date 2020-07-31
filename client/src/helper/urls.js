export const url = {
  get: {
    home: "http://localhost:5000/",
    profile: "http://localhost:5000/user/profile",
    allPost: "http://localhost:5000/post/all",
    recommendation: "http://localhost:5000/user/recommend",
    following: "http://localhost:5000/user/friend/following/list",
    ffCount: "http://localhost:5000/user/friend/count",
  },
  post: {
    newPost: "http://localhost:5000/post/new",
    updateUser: "http://localhost:5000/user/profile/update",
    signUp: "http://localhost:5000/auth/signup",
    logIn: "http://localhost:5000/auth/login",
    findUser: "http://localhost:5000/user/find",
    follow: "http://localhost:5000/user/friend/follow",
    unFollow: "http://localhost:5000/user/friend/unfollow",
  },
};
