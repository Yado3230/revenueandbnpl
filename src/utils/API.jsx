import axios from "axios";
import store from "./../store/store";

// Create a new instance of axios with the token in the header
export const LOGIN_NODE_API = axios.create({
  baseURL: "/api",
});

export const NODE_API = axios.create({
  baseURL: "/api",
});

// export const LOGIN_NODE_API = axios.create({
//   baseURL: "https://souqpass.coopbankoromiasc.com/api",
// });

// export const NODE_API = axios.create({
//   baseURL: "https://souqpass.coopbankoromiasc.com/api",
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
