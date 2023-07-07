const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from "axios";

const myAxios = axios.create({
  baseURL: `${baseUrl}/message`,
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
console.log("interceptor called");

export default myAxios;
