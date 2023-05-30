 
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
 console.log(baseUrl);
const myAxios = axios.create({
  baseURL:`${baseUrl}/admin/auth`,
});

export default myAxios;