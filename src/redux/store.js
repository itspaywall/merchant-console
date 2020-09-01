import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "./reducers";

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), composeWithDevTools())
);

export default store;
