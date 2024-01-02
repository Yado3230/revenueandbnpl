import axios from "axios";
import store from "./../store/store";

// Create a new instance of axios with the token in the header
export const LOGIN_NODE_API = axios.create({
  baseURL: "https://10.1.177.130:8040/api",
});

export const NODE_API = axios.create({
  baseURL: "https://10.1.177.130:8040/api",
});

// export const LOGIN_NODE_API = axios.create({
//   baseURL: "http://192.168.14.191:8040/api",
// });

// export const NODE_API = axios.create({
//   baseURL: "http://192.168.14.191:8040/api",
// });

// Request interceptor to update Authorization header with the token
NODE_API.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.userProfile.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
