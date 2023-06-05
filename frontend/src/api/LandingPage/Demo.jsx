const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from "axios";

const Demoapi = axios.create({
  baseURL: `${baseUrl}`,
});


export default  Demoapi;;