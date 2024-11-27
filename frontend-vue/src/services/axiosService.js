import axios from "axios";
import { useAuth } from "@/stores";




const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});



axiosInstance.interceptors.request.use(
 function (config)  {
    const authInfo = useAuth();
    const auth = authInfo.user ? `Bearer ${authInfo.user.token}` : "";
    config.headers['Authorization'] = auth;
    return config;
  },
  function (error) {
    return error;
  }
);

axiosInstance.interceptors.response.use(
  function (response){
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      const authInfo = useAuth();
      authInfo.user = {};
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

