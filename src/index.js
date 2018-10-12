import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store";
import SubscribeFleetRoute from "./containers/SubscribeFleetRoute";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <SubscribeFleetRoute />
    </div>
  </Provider>,
  rootEl
);
