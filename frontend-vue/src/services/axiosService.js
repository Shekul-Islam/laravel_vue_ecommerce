import axios from "axios";
import { useAuth } from "@/stores";
import { storeToRefs } from "pinia";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // console.log(config);
  const user = storeToRefs(useAuth());

  const auth = user.data ? `Bearer ${authInfo.user.meta.token}` : "";
  config.headers['Authorization'] = auth;
  return config;
}, 
function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosInstance;