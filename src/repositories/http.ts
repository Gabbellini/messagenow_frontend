import axios from "axios";
import router from "@/router";

export const apiDomain = "localhost:8080/api";
export const http = axios.create({
  baseURL: `http://${apiDomain}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
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
