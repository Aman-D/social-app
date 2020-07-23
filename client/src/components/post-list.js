import React, { useState } from "react";

import { Post } from "./index";
const PostList = ({ posts }) => {
  return posts.map((post, index) =>
    posts ? <Post key={index} post={post} /> : null
  );
};

export default PostList;
