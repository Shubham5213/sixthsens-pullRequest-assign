import React, { useState, useReducer, useEffect, createContext } from "react";
import AuthService from "../services/authService";
import UserService from "../services/userService";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  isLoggedIn: false,
  username: null,
  email: null,
  userId: null,
});

const userReducer = (prevState, action) => {
  return {
    username: action.username,
    email: action.email,
    userId: action.userId,
  };
};

export const AuthContextProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, dispatchUser] = useReducer(userReducer, {
    username: "",
    email: "",
    userId: "",
  });

  const logoutHandler = async () => {
    setLogin(false);
    await AuthService.getLogout();
    window.location.reload(false);
  };

  const loginHandler = () => setLogin(true);
  const updateUserHandler = (user) => dispatchUser(user);

  useEffect(() => {
    UserService.getUserDetails().then(async (data) => {
      if (!data) {
        setLogin(false);
        setLoading(false);
        return;
      }

      if (data.auth) {
        setLogin(true);
        dispatchUser({
          username: data.user.username,
          email: data.user.email,
          userId: data.user.userId,
        });
        setLoading(false);
      } else {
        setLogin(false);
        setLoading(false);
      }
    });
  }, []);

  const contextValue = {
    isLoggedIn: login,
    username: user.username,
    email: user.email,
    userId: user.userId,
    login: loginHandler,
    logout: logoutHandler,
    updateUser: updateUserHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
