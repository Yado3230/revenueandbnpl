import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/";

const initalState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
