import React, { useState, useEffect, useContext } from "react";
import { PostList } from "./index";
import { url } from "../helper/urls";
import { ToastContext } from "../context-provider/toast";
const LikedPosts = () => {
  const { toast } = useContext(ToastContext);
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    try {
      var headers = new Headers();
      const token = localStorage.getItem("social-app-user");
      headers.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
        method: "GET",
        headers,
      };
      fetch(url.get.likedPosts, requestOptions)
        .then((response) => response.json())
        .then(({ data: { type, posts } }) => {
          if (type === "error") {
            toast({ type: "error", message: "Error! PLease try again later" });
          }
          if (type === "success") {
            setPosts(posts);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      toast({ type: "error", message: "Error! PLease try again later" });
    }
  }, []);
  return null;
};

export default LikedPosts;
