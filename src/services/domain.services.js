import axios from "axios";
import authHeader from "./auth-header";
import { NODE_API } from "../utils/API";


const addUrls = async (user_id, name, url) => {
  return await NODE_API.post(
    "/createurl",
    {
      user_id,
      name,
      url,
    },
    { withCredentials: true, credentials: "include" }
  )
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};
const getDomain = async (id) => {
  return await NODE_API.get(
    `/getdomain?user_id=${id}`,

    {
      withCredentials: true,
      credentials: "include",
    }
  ).then((response) => {
    return response.data.url;
  });
};
const DomainServices = {
  addUrls,
  getDomain,
};

export default DomainServices;
