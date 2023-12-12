import axios from "axios";
import authHeader from "./auth-header";

const getImage = async (API_URL) => {
  return await axios.get(API_URL).then((response) => response.data);
};

const ImageServices = {
  getImage,
};

export default ImageServices;
