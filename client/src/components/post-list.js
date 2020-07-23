import React, { useState } from "react";

import { Post } from "./index";
const PostList = ({ posts }) => {
  return posts.map((post, index) => <Post key={index} post={post} />);
};

export default PostList;
