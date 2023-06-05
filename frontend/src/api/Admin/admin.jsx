 
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
 console.log(baseUrl);
const myAxios = axios.create({
  baseURL:`${baseUrl}/admin`,
});


 console.log('hlooo');
myAxios.interceptors.request.use(
  
  (config) => {
    const state = localStorage.getItem("reduxState");
const reduxState = JSON.parse(state);

const accessToken = reduxState.adminLogin.accessToken;
const refreshToken=reduxState.adminLogin.refreshToken

    config.headers[
      "Authorization"
    ] = `Bearer access_token=${accessToken},refresh_token=${refreshToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
console.log('interceptor called');
export default myAxios;