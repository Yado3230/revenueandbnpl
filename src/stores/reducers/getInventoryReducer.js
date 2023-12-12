import { SET_INVENTORY } from "../types";

const initialState = {
  inventoryDetail: [],
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
    default:
      return state;
  }
}
