import { SET_INVENTORY } from "../types";
// import AuthService from "../../services/auth.service";

import InventoryService from "../../services/inventory.service";
export const getInventoryDetail = (userID) => async (dispatch) => {
  try {
    // const user = AuthService.getCurrentUser();
    const inventoryDetail = await InventoryService.getAllInventory(userID);
    dispatch({
      type: SET_INVENTORY,
      payload: inventoryDetail,
    });
  } catch (error) {
    return error;
  }
};
