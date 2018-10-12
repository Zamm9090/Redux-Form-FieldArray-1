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
import FleetFieldArray from "./FleetFieldArray";
import { SubscribeFleetProvider } from "./FleetContext";

class FieldArraysForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    location: PropTypes.shape({
      state: PropTypes.shape({
        selected: PropTypes.arrayOf(PropTypes.object)
      })
    }),
    onSelectionChange: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func,
    updateSelectAll: PropTypes.func,
    updateFleetFormStore: PropTypes.func
  };

  state = {
    selectAll: false,
    selected: [],
    errors: []
  };

  componentWillReceiveProps(nextProps, prevProps) {
    console.log(
      "~~~~~~~~~~>>> componentWillReceiveProps ",
      nextProps,
      prevProps
    );
    this.setState({
      selected: nextProps.selected,
      selectAll: nextProps.selectAll
    });
  }

  onSubmit = values => {
    console.log("~~~~~~~ >>> Form Submit <<< ~~~~~~~ ", this.props);
    console.log("~~~~~~~ >>> Selected Form Values ", values);
    console.log("~~~~~~~ >>> mapStateToProps ", this.state);
    let error = this.props.validate(this.state);
    console.log("~~~~~~~~~>>> Validate error ", error);
    if (error.length === 0) {
      this.props.onSubmit();
    }
    this.setState({ errors: error });
  };

  addNewRow = () => {
    const { selected, selectAll } = this.state;
    console.log("~~~~~~~ >>> addNewRow <<< ~~~~~~~ ", selected);
    selected.push({ selected: selectAll });
    this.props.updateFleetFormStore(selected);
    this.props.updateSelectAll(selectAll);
  };

  removeNewRow = () => {
    const { selected } = this.state;
    _.remove(selected, item => {
      return item.selected;
    });
    this.props.updateFleetFormStore(selected);
    if (selected.length === 0) {
      this.props.updateSelectAll(false);
    }
  };

  onSelectAll = (event, newValue, previousValue, name) => {
    console.log("~~~~~~ >>> onSelectAll <<< ~~~~~~");
    const { selected } = this.state;
    _.forEach(selected, item => {
      item.selected = newValue;
    });
    this.props.updateFleetFormStore(selected);
    this.props.updateSelectAll(newValue);
  };

  render() {
    const { handleSubmit } = this.props;
    const { selected, errors } = this.state;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="d-flex flex-column text-danger">
          {errors.map((item, index) => {
            return (
              <div key={index} style={{ display: "flex", flexWrap: "wrap" }}>
                <div>{item.id}) </div>
                <div>{item.i18nMessages.join(",")}</div>
              </div>
            );
          })}
        </div>
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>Subscribe Fleet</div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column" style={{ overflowX: "auto" }}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, order: 1, width: "10%" }}>
                  <Field
                    name="selectAll"
                    type="checkbox"
                    onChange={this.onSelectAll}
                    component="input"
                    value={this.state.selectAll}
                  />
                </div>
                <div style={{ order: 2, width: "45%" }}>FirstName</div>
                <div style={{ order: 3, width: "45%" }}>LastName</div>
              </div>
              <SubscribeFleetProvider>
                <FieldArray name="selected" component={FleetFieldArray} />
              </SubscribeFleetProvider>
              {selected.length > 0 ? (
                <div />
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{ borderTop: "1px solid gray", marginTop: "0.5rem" }}
                  />
                  <h6
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "0.5rem"
                    }}
                  >
                    No Data Found
                  </h6>
                </div>
              )}
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-end">
              <button className="btn btn-success mr-2" type="submit">
                Submit
              </button>
              <button
                className="btn btn-primary mr-2"
                type="button"
                onClick={() => this.addNewRow()}
              >
                <i className="fa fa-plus" />
              </button>
              <button
                className="btn btn-danger mr-2"
                type="button"
                onClick={() => this.removeNewRow()}
              >
                <i className="fa fa-minus" />
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  let error = [];
  console.log("~~~~~~~~~~~ >>> Start validate ", values);
  _.forEach(values.selected, (item, index) => {
    let row = { i18nMessages: [] };
    _.forEach(["firstName", "lastName"], entity => {
      if (!item[entity]) {
        switch (entity) {
          case "firstName":
            row.i18nMessages.push("First Name is Required");
            break;
          case "lastName":
            row.i18nMessages.push("Last Name is Required");
            break;
          default:
            break;
        }
        row.id = index;
      }
    });
    if (row.id) {
      error.push(row);
    }
  });
  console.log("~~~~~~~~~~~ >>> End validate ", error);
  return error;
};

FieldArraysForm = reduxForm({
  form: "fleetForm",
  validate
})(FieldArraysForm);

const selector = formValueSelector("fleetForm");

function mapStateToProps(state, ownProps) {
  const selected = [
    { selected: false, firstName: "Veera", lastName: "Obulareddy" }
  ];
  const selectAll = false;
  const initialValues = {
    selectAll,
    selected
  };
  return {
    initialValues,
    selectAll: selector(state, "selectAll"),
    selected: selector(state, "selected")
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit(values) {
      console.log("Selected Form Values ", values);
    },
    updateSelectAll(val) {
      console.log("~~~~~~~ >>> updateSelectAll ", val);
      dispatch(change("fleetForm", "selectAll", val));
    },
    updateFleetFormStore(dataSet) {
      console.log("~~~~~~~ >>> updateFleetFormStore ", dataSet);
      dispatch(change("fleetForm", "selected", dataSet));
    }
  };
}

export default (FieldArraysForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldArraysForm));
