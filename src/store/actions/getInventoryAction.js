import { SET_INVENTORY, SET_PRODUCTS } from "../types";

import InventoryService from "../../services/inventory.service";
export const getInventoryDetail = (userID) => async (dispatch) => {
  try {
    const inventoryDetail = await InventoryService.getAllInventory(userID);
    dispatch({
      type: SET_INVENTORY,
      payload: inventoryDetail,
    });
  } catch (error) {
    return error;
  }
};

export const getProductDetails = () => async (dispatch) => {
  try {
    const productDetails = await InventoryService.getAllProducts();
    dispatch({
      type: SET_PRODUCTS,
      payload: productDetails,
    });
  } catch (error) {
    return error;
  }
};
