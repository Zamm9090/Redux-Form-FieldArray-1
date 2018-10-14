import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  change
} from "redux-form";

import AFTOrderEntryFormRow from "./AFTOrderEntryFormRow";

class AFTOrderEntryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    meta: PropTypes.object,
    title: PropTypes.string,
    getAllAccounts: PropTypes.func,
    onSubmit: PropTypes.func
  };

  state = {
    orderEntries: [],
    selectAll: false,
    noOfSelectedOrders: 0,
    options: {
      accounts: []
    }
  };

  componentDidMount() {
    const { options } = this.state;
    options.accounts = this.props.getAllAccounts();
    this.setState({ options: options });
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.setState({
      orderEntries: nextProps.orderEntries,
      selectAll: nextProps.selectAll
    });
    this.getSelectedOrdersCount(nextProps.orderEntries);
  }

  getSelectedOrdersCount = orderEntries => {
    const selectedOrders = _.filter(orderEntries, o => {
      return o.selected;
    });
    this.setState({
      noOfSelectedOrders: selectedOrders.length
    });
  };

  onSelectAllFieldChange = (event, newValue, previousValue, name) => {
    const { orderEntries } = this.state;
    _.forEach(orderEntries, item => {
      item.selected = newValue;
    });
    this.props.updateOrderEntriesState("orderEntries", orderEntries);
    this.getSelectedOrdersCount(this.state.orderEntries);
  };

  addNewOrderEntry = () => {
    const { orderEntries, selectAll } = this.state;
    orderEntries.push({ selected: selectAll });
    this.props.updateOrderEntriesState("orderEntries", orderEntries);
    this.getSelectedOrdersCount(this.state.orderEntries);
  };

  removeSelectedOrderEntry = () => {
    const { orderEntries } = this.state;
    _.remove(orderEntries, item => {
      return item.selected;
    });
    this.props.updateOrderEntriesState("orderEntries", orderEntries);
    this.props.updateOrderEntriesState("selectAll", false);
    this.getSelectedOrdersCount(this.state.orderEntries);
  };

  onSubmit = values => {
    this.props.onSubmit(values);
  };
  render() {
    const { handleSubmit, title, meta } = this.props;
    console.log("~~~~~~~~~~~~ >>> Meta this.props.meta ", meta);
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="container">
          <div className="row">Errors</div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">{title}</div>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column" style={{ overflowX: "auto" }}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, order: 1, width: "10%" }}>
                  <Field
                    name="selectAll"
                    type="checkbox"
                    onChange={this.onSelectAllFieldChange}
                    component="input"
                    value={this.state.selectAll}
                  />
                </div>
                <div style={{ order: 2, width: "45%" }}>Account</div>
                <div style={{ order: 3, width: "45%" }}>LastName</div>
              </div>
              <FieldArray
                name="orderEntries"
                component={AFTOrderEntryFormRow}
                options={this.state.options}
              />
            </div>
          </div>
          <div className="card-footer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap"
              }}
            >
              <button className="btn btn-primary mr-2" type="submit">
                Enter Selected Orders{" "}
                {this.state.noOfSelectedOrders > 0
                  ? this.state.noOfSelectedOrders
                  : ""}
              </button>
              <button
                className="btn btn-default mr-2"
                onClick={this.addNewOrderEntry}
                type="button"
              >
                Add More Orders
              </button>
              <button
                className="btn btn-default mr-2"
                type="button"
                onClick={this.removeSelectedOrderEntry}
              >
                Remove Selected Orders
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  console.log("Start::::~~~~~~~~~~~~ >>> validate <===> values ", values);
  if (!values.orderEntries || !values.orderEntries.length) {
    errors.orderEntries = { _error: "At least one order must be selected" };
  } else {
    const membersArrayErrors = [];
    errors.orderEntries = { _error: undefined };
    values.orderEntries.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member.accounts) {
        memberErrors.accounts = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });

    if (membersArrayErrors.length) {
      errors.orderEntries = membersArrayErrors;
    }
  }
  console.log("End::::~~~~~~~~~~~~ >>> validate <===> errors ", errors);
  return errors;
};

AFTOrderEntryForm = reduxForm({
  form: "AFTOrderEntry",
  validate
})(AFTOrderEntryForm);

const formAFTOrderEntry = formValueSelector("AFTOrderEntry");

function mapStateToProps(state, ownProps) {
  const orderEntries = [{ selected: true, accounts: "32214783" }];
  const selectAll = false;
  const initialValues = {
    selectAll,
    orderEntries
  };
  return {
    initialValues,
    selectAll: formAFTOrderEntry(state, "selectAll"),
    orderEntries: formAFTOrderEntry(state, "orderEntries")
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit(values) {
      console.log("Selected Form Values ", values);
    },
    updateOrderEntriesState(key, val) {
      dispatch(change("AFTOrderEntry", key, val));
    },
    getAllAccounts() {
      let accounts = [];
      accounts.push({ id: 32214782, displayName: "Account 1" });
      accounts.push({ id: 32214783, displayName: "Account 2" });
      accounts.push({ id: 32214784, displayName: "Account 3" });
      accounts.push({ id: 32214785, displayName: "Account 4" });
      accounts.push({ id: 32214786, displayName: "Account 5" });
      return accounts;
    }
  };
}

export default (AFTOrderEntryForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AFTOrderEntryForm));
