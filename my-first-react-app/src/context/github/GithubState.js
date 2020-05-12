import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  GET_USERS,
  SET_LOADING,
} from "../Types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV === "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Get Users
  const searchUsers = async user => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: GET_USERS, payload: res.data.items });
  };

  //Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Get User
  const getSingleUser = async userName => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  //Get Repos
  const getUserRepos = async userName => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  //Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getSingleUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
