import axios from "axios";
import jwt from "jwt-decode";
import { LOGIN_NODE_API, NODE_API } from "../utils/API";
import jwtDecode from "jwt-decode";
// import { useSelector } from "react-redux";
import {
  setRole,
  setToken,
  setUserID,
  setUsername,
} from "../store/actions/userProfileAction";
// const user = JSON.parse(localStorage.getItem("user"));
const register = async (username, password) => {
  const response = await LOGIN_NODE_API.post("/merchant/register", {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (
  username,
  password,
  setMessage,
  setLoading,
  navigate,
  dispatch
) => {
  try {
    await LOGIN_NODE_API.post(
      "/merchant/login",
      {
        username,
        password,
      }
      // { withCredentials: true }
    ).then((res) => {
      if (res.data.token) {
        dispatch(setToken(res?.data?.token));
        const decoded = jwtDecode(res.data.token);
        const user = jwt(res.data.token);
        if (decoded?.role === "sales") {
          dispatch(
            setUsername(decoded?.email_address || decoded?.phone_number)
          );
          dispatch(setUserID(decoded?.sales_id));
          dispatch(setRole(decoded?.role));
          setLoading(false);
          console.log(decoded);
          navigate("/admin");
          window.location.reload();
        } else if (decoded?.role === "merchant") {
          dispatch(
            setUsername(decoded?.email_address || decoded?.phone_number)
          );
          dispatch(setUserID(decoded?.merchant_id));
          dispatch(setRole(decoded?.role));
          console.log(decoded);
          setLoading(false);
          navigate("/users");
          // window.location.reload();
        } else if (decoded?.role === "Admin") {
          alert("not authorized");
          // window.location.reload();
        }
        // document.cookie = "token=" + response.data.token;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
    });
  } catch (error) {
    try {
      setMessage(error?.response?.data?.message);
      setLoading(false);
      error?.response?.data?.message === "In active Account"
        ? setMessage(error?.response?.data?.message)
        : await LOGIN_NODE_API.post("/sales/login", {
            username,
            password,
          }).then((res) => {
            if (res.data.token) {
              dispatch(setToken(res?.data?.token));
              const decoded = jwtDecode(res.data.token);
              const user = jwt(res.data.token);
              if (decoded?.role === "sales") {
                // dispatch(setUsername(decoded?.email_address));
                dispatch(setUserID(decoded?.sales_id));
                dispatch(setRole(decoded?.role));
                setLoading(false);
                navigate("/sales");
                window.location.reload();
              } else if (decoded?.role === "merchant") {
                dispatch(setUsername(decoded?.email_address));
                dispatch(setUserID(decoded?.merchant_id));
                dispatch(setRole(decoded?.role));
                setLoading(false);
                navigate("/users");
                // window.location.reload();
              }
              // document.cookie = "token=" + response.data.token;
              localStorage.setItem("user", JSON.stringify(user));
              return user;
            }
          });
    } catch (error) {
      setLoading(false);
      setMessage(error?.response?.data?.error);
    }
  }
};

const generateApiKey = async (merchant_id, expiryDate) => {
  try {
    const response = await NODE_API.post("/apiKey/generate", {
      merchant_id,
      expiryDate,
    });
    return [response.data, response.status];
  } catch (err) {
    if (err.response) {
      return err.response;
    } else if (err.request) {
      return err.request;
    }
  }
};

const getGeneratedApiKey = async (merchant_id) => {
  const response = await NODE_API.get(`apiKey/get?id=${merchant_id}`);
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  getCurrentUser,
  generateApiKey,
  getGeneratedApiKey,
};

export default AuthService;
