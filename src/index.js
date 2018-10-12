import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store";
import FieldArraysForm from "./containers/SubscribeFleet/FieldArraysForm";
const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <FieldArraysForm />
    </div>
  </Provider>,
  rootEl
);
