import { combineReducers } from "redux";
import bank_accountReducer from "./bank_accountReducer";
import user_profile_reducer from "./user_profile_reducer";
import getTransactionDetailReducer from "./getTransactionDetailReducer";
import generate_api_key_reducer from "./generateApiKeyReducer";
import bankReducer from "./bankReducer";
import adminFetchAllTransactions from "./adminFetchAllTransactions";
import deviceManagementReducer from "./deviceManagementReducer";
import domainReducer from "./domainReducer";
import bussinessReducer from "./bussinessReducer";
import agentReducer from "./agentReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getInventoryReducer from "./getInventoryReducer";
import getSalesReducer from "./getSalesReducer";
import getLoanConfigReducer from "./getLoanConfigReducer";
import tokenReducer from "./token.reducer";
import reportReducer from "./reportReducer";
import expenseReducer from "./expenseReducer";
import confReducer from "./confReducer";
import capacityReducer from "./capacityReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userProfile", "token"],
};
const rootReducer = combineReducers({
  accountsList: bank_accountReducer,
  userProfile: user_profile_reducer,
  apiKey: generate_api_key_reducer,
  transactionDetail: getTransactionDetailReducer,
  transactionByTransactionId: getTransactionDetailReducer,
  transactionDetailAll: adminFetchAllTransactions,
  deviceDetail: deviceManagementReducer,
  registerDevice: deviceManagementReducer,
  bankInfo: bankReducer,
  domain: domainReducer,
  bussinessInfo: bussinessReducer,
  agentInfo: agentReducer,
  inventoryInfo: getInventoryReducer,
  salesInfo: getSalesReducer,
  loanConfigInfo: getLoanConfigReducer,
  tokenInfo: tokenReducer,
  reportInfo: reportReducer,
  expenseInfo: expenseReducer,
  confInfo: confReducer,
  capacityInfo: capacityReducer,
});
export default persistReducer(persistConfig, rootReducer);
