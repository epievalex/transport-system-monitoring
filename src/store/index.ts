import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer as ordersReducer } from "./orders";
import { reducer as courierReducer } from "./couriers";

const rootReducer = combineReducers({ orders: ordersReducer, couriers: courierReducer });

const middlewares = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export type RootState = ReturnType<typeof store.getState>;

export default store;
