import { SET_INVENTORY, SET_PRODUCTS } from "../types";

const initialState = {
  inventoryDetail: [],
  productsDetail: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_INVENTORY:
      return {
        ...state,
        inventoryDetail: action.payload,
        loading: false,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        productsDetail: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
