import { NODE_API } from "../utils/API";

const headers = {
  "Content-Type": "multipart/form-data",
};

const CreateInventory = async (formData, setUpdated, updated) => {
  return await NODE_API.post("/items/create", formData, headers).then(
    (response) => {
      setUpdated(!updated);
      return response;
    }
  );
};

const CreateProduct = async (values, setUpdated, updated) => {
  return await NODE_API.post("/rb/product/register", values).then(
    (response) => {
      setUpdated(!updated);
      return response;
    }
  );
};

const SellItem = async (values, setUpdated, updated) => {
  return await NODE_API.post("/items/saleItem", values).then((response) => {
    setUpdated(!updated);
    return response;
  });
};

const SellItems = async (values, setUpdated, updated) => {
  console.log(values);
  return await NODE_API.post("/items/batchsale", {
    paymentDetail: {
      tipAmount: values.tipAmount,
      discount: values.discount,
      paymentMethod: values.paymentMethod,
    },
    items: values.items,
  }).then((response) => {
    setUpdated(!updated);
    return response;
  });
};

const SellProduct = async (values, setUpdated, updated) => {
  return await NODE_API.post("/rb/product/saleProduct", values).then(
    (response) => {
      setUpdated(!updated);
      return response;
    }
  );
};

const EditInventory = async (formData, setUpdated, updated) => {
  return await NODE_API.put("/items/editItem", formData, headers).then(
    (response) => {
      setUpdated(!updated);
      return response;
    }
  );
};

const EditProduct = async (values, setUpdated, updated) => {
  return await NODE_API.put(
    `/rb/product?product_id=${values.product_id}`,
    values,
    headers
  ).then((response) => {
    setUpdated(!updated);
    return response;
  });
};

const ToggleStatus = async (row, setToggeled, toggeled) => {
  return await NODE_API.put("/items/editItemStatus", {
    item_id: row.item_id,
    merchant_id: row.merchant_id,
    status: !row.status,
  }).then((response) => {
    setToggeled(!toggeled);
    return response;
  });
};

const AssignInventory = async (item_id, sales_id, merchant_id) => {
  return await NODE_API.post("/items/assigntoSales", {
    item_id,
    sales_id,
    merchant_id,
  }).then((response) => response);
};

const getAllInventory = async (sales_id) => {
  return await NODE_API.get(`/items/getAll?id=${sales_id}`).then(
    (response) => response.data
  );
};
const getAllProducts = async () => {
  return await NODE_API.get(`/rb/product/getProduct`).then(
    (response) => response.data
  );
};

const InventoryService = {
  CreateInventory,
  getAllInventory,
  AssignInventory,
  EditInventory,
  ToggleStatus,
  getAllProducts,
  CreateProduct,
  EditProduct,
  SellItem,
  SellProduct,
  SellItems,
};

export default InventoryService;
