import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import SubscribeFleetContainer from "./containers/SubscribeFleet/Container";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <SubscribeFleetContainer />
    </div>
  </Provider>,
  rootEl
);
