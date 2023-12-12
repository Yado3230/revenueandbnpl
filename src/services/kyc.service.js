import { NODE_API } from "../utils/API";

const headers = {
  "Content-Type": "multipart/form-data",
};

const CreateKYC = async (formData, setUpdated, updated) => {
  return await NODE_API.post("/eky/create", formData, headers).then(
    (response) => {
      setUpdated(!updated);
      return response;
    }
  );
};
// const AssignInventory = async (item_id, sales_id, merchant_id) => {
//   return await NODE_API.post("/items/assigntoSales", {
//     item_id,
//     sales_id,
//     merchant_id,
//   }).then((response) => response);
// };

// const getAllInventory = async (sales_id) => {
//   return await NODE_API.get(`/sales/getAll?id=${sales_id}`).then(
//     (response) => response.data
//   );
// };

const ToggleRbf = async () => {
  return await NODE_API.put("/eky/service-switch").then((response) => {
    window.location.reload();
    return response;
  });
};

const KYCService = {
  CreateKYC,
  ToggleRbf,
};

export default KYCService;
