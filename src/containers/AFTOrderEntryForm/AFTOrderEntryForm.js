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
    title: PropTypes.string,
    getAllAccounts: PropTypes.func,
    onSubmit: PropTypes.func
  };

  state = {
    orderEntries: [],
    selectAll: false,
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
    console.log(
      "~~~~~~~~~~>>> componentWillReceiveProps ",
      nextProps,
      prevProps
    );
    this.setState({
      orderEntries: nextProps.orderEntries,
      selectAll: nextProps.selectAll
    });
  }

  getSelectedOrdersCount = () => {
    const { orderEntries } = this.state;
    const selectedOrders = _.filter(orderEntries, o => {
      return o.selected;
    });
    return selectedOrders.length;
  };

  onSelectAllFieldChange = (event, newValue, previousValue, name) => {
    console.log(
      "~~~~~~~~~~ >>> onSelectAllFieldChange ",
      event,
      newValue,
      previousValue,
      name
    );
    const { orderEntries } = this.state;
    _.forEach(orderEntries, item => {
      item.selected = newValue;
    });
    this.props.updateOrderEntriesState("orderEntries", orderEntries);
  };

  addNewOrderEntry = () => {
    const { orderEntries, selectAll } = this.state;
    orderEntries.push({ selected: selectAll });
    console.log("~~~~~~~~~~~ addNewOrderEntry >> ", orderEntries);
    this.props.updateOrderEntriesState("orderEntries", orderEntries);
  };

  removeSelectedOrderEntry = () => {
    const { orderEntries } = this.state;
    _.remove(orderEntries, item => {
      return item.selected;
    });
    this.props.updateOrderEntriesState("orderEntries", orderEntries);
    if (orderEntries.length === 0) {
      this.props.updateOrderEntriesState("selectAll", false);
    }
  };

  onSubmit = values => {
    console.log("~~~~~~~~~~ >>> AFTOrderEntryForm <:::> onSubmit ", values);
    this.props.onSubmit(values);
  };
  render() {
    const { handleSubmit, title } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
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
                {this.getSelectedOrdersCount() > 0
                  ? this.getSelectedOrdersCount()
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

AFTOrderEntryForm = reduxForm({
  form: "AFTOrderEntry"
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
      accounts.push({ id: 32214782, displayName: "Sunitha Account" });
      accounts.push({ id: 32214783, displayName: "Deepthi Account" });
      accounts.push({ id: 32214784, displayName: "Radhika Account" });
      accounts.push({ id: 32214783, displayName: "Preetha Account" });
      accounts.push({ id: 32214784, displayName: "Sumanaa Account" });
      return accounts;
    }
  };
}

export default (AFTOrderEntryForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AFTOrderEntryForm));
