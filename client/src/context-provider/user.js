import React, { useReducer, createContext, useEffect } from "react";
import { userReducer } from "../reducer/userReducer";
import userActionTypes from "../action-type/user";
export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("social-app-user");
      if (token) {
        fetch("http://localhost:5000/user/profile", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(({ data }) => {
            if (data.result) {
              dispatch({
                type: userActionTypes.UPDATE_USER,
                payload: {
                  profile: data.result.user,
                  posts: data.result.posts,
                },
              });
            } else {
              console.log(data);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ dispatch, user: userState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
