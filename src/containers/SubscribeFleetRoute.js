import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import Container from "./SubscribeFleet/Container";

const selector = formValueSelector("fleetForm");

function mapStateToProps(state, ownProps) {
  const selected = [
    { selected: true, firstName: "Veera", lastName: "Obulareddy" }
  ];
  const initialValues = {
    selected
  };
  return {
    initialValues,
    selected: selector(state, "selected")
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit(values) {
      console.log("Selected Form Values ", values);
    }
  };
}

const SubscribeFleetRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default SubscribeFleetRoute;
