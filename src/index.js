import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store";
import AFTOrderEntryForm from "./containers/AFTOrderEntryForm/AFTOrderEntryForm";
const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <AFTOrderEntryForm title={"Agent Trade Funding"} />
    </div>
  </Provider>,
  rootEl
);
