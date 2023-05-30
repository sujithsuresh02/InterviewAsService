 
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';

const myAxios = axios.create({
  baseURL:`${baseUrl}/company`,
});

export default myAxios;