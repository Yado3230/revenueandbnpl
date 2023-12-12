import { GET_TOKEN } from "../types";

export const setToken = (item) => ({
  type: GET_TOKEN,
  payload: item,
});
