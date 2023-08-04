import axios from "axios";
import router from "@/router";

export const http = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (e) => {
    if (e?.response?.status === 403 || e?.response?.status === 401) {
      await router.push({name: "login"});
    }
    return Promise.reject(e);
  }
);
