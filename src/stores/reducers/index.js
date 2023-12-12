import { combineReducers } from "redux";
import user_profile_reducer from "./user_profile_reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getInventoryReducer from "./getInventoryReducer";
import bank_accountReducer from "./bank_accountReducer";
import getTransactionDetailReducer from "./getTransactionDetailReducer";
import adminFetchAllTransactions from "./adminFetchAllTransactions";

import generate_api_key_reducer from "./generateApiKeyReducer";
import bankReducer from "./bankReducer";
import deviceManagementReducer from "./deviceManagementReducer";
import domainReducer from "./domainReducer";
import bussinessReducer from "./bussinessReducer";
import agentReducer from "./agentReducer";
import reportReducer from "./reportReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userProfile", "token"],
};
const rootReducer = combineReducers({
  accountsList: bank_accountReducer,
  userProfile: user_profile_reducer,
  transactionDetail: getTransactionDetailReducer,
  transactionByTransactionId: getTransactionDetailReducer,
  transactionDetailAll: adminFetchAllTransactions,
  inventoryInfo: getInventoryReducer,

  apiKey: generate_api_key_reducer,
  reportInfo: reportReducer,
  deviceDetail: deviceManagementReducer,
  registerDevice: deviceManagementReducer,
  bankInfo: bankReducer,
  domain: domainReducer,
  bussinessInfo: bussinessReducer,
  agentInfo: agentReducer,
});
export default persistReducer(persistConfig, rootReducer);
