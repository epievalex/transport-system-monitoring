import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer as ordersReducer } from "./orders";
import { reducer as courierReducer } from "./couriers";
import { reducer as carParkReducer } from "./carPark";

const rootReducer = combineReducers({ orders: ordersReducer, couriers: courierReducer, carPark: carParkReducer });

const middlewares = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export type RootState = ReturnType<typeof store.getState>;

export default store;
