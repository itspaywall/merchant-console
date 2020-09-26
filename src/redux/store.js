import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";

let store;
if (process.env.NODE_ENV === "development") {
    store = createStore(
        rootReducer,
        compose(applyMiddleware(thunk), composeWithDevTools())
    );
} else {
    store = createStore(rootReducer, compose(applyMiddleware(thunk)));
}

export default store;
