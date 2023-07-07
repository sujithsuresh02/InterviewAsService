const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from "axios";
// import DummyComponent from "../AccessToken";
import React from "react";
import ReactDOM from "react-dom";
const myAxios = axios.create({
  baseURL: `${baseUrl}/interviewer`,
});

myAxios.interceptors.request.use(
  (config) => {
    const state = localStorage.getItem("reduxState");
    const reduxState = JSON.parse(state);
    const token = reduxState.commonLogin.loginDetails;

    config.headers[
      "Authorization"
    ] = `Bearer access_token=${token?.accessToken},refresh_token=${token?.refreshToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// myAxios.interceptors.response.use(
//   (response) => {
//     console.log(response, "resppnse");
//     const authorizationHeader = response.headers.authorization;
//     if (authorizationHeader) {
//       const newAccessToken = authorizationHeader.split(" ")[1];
//     }
//     return response;
//   },
//   (error) => {
//     console.log(error, "respnse interceptor error");
//     return Promise.reject(error);
//   }
// );
console.log("interceptor called");

export default myAxios;
