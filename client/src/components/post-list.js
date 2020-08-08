import React, { useState } from "react";

import { Post } from "./index";
const PostList = ({ posts }) => {
  if (posts.length > 0) {
    return posts.map((post, index) =>
      posts ? <Post key={index} post={post} /> : null
    );
  } else {
    return null;
  }
};

export default PostList;
