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
    selected: []
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
    this.props.onSubmit();
  };

  addNewRow = () => {
    console.log("~~~~~~~ >>> addNewRow <<< ~~~~~~~");
    const { selected, selectAll } = this.state;
    selected.push({ selected: selectAll });
    this.props.updateFleetFormStore(selected);
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
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>Subscribe Fleet</div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column" style={{ overflowX: "auto" }}>
              <div className="d-flex">
                <div className="p-2 flex-fill">
                  <Field
                    name="selectAll"
                    type="checkbox"
                    onChange={this.onSelectAll}
                    component="input"
                    value={this.state.selectAll}
                  />
                </div>
                <div className="p-2 flex-fill">FirstName</div>
                <div className="p-2 flex-fill">LastName</div>
              </div>
              <SubscribeFleetProvider>
                <FieldArray name="selected" component={FleetFieldArray} />
              </SubscribeFleetProvider>
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
FieldArraysForm = reduxForm({
  form: "fleetForm"
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
      dispatch(change("fleetForm", "selectAll", val));
    },
    updateFleetFormStore(dataSet) {
      console.log("~~~~~~~ >>> addNewRow ", dataSet);
      dispatch(change("fleetForm", "selected", dataSet));
    }
  };
}

export default (FieldArraysForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldArraysForm));
