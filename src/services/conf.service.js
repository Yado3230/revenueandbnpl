import { NODE_API } from "../utils/API";

const createCategory = async (data, setUpdated, updated) => {
  return await NODE_API.post("/items/createItemCategory", data).then(
    (response) => {
      setUpdated(!updated);
      return response.data;
    }
  );
};

const getAllCategory = async () => {
  return await NODE_API.get("/items/getAllCategories").then(
    (response) => response?.data
  );
};

const ConfigService = {
  createCategory,
  getAllCategory,
};

export default ConfigService;
