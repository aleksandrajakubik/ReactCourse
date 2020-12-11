import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { rootReducer } from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));
export const StoreContext = React.createContext({ store: null })

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById("root")
);