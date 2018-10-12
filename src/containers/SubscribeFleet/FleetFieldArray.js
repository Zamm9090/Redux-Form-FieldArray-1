import React, { Component } from "react";
import { Field } from "redux-form";
import _ from "lodash";
import { SubscribeFleetConsumer } from "./FleetContext";

class FleetFieldArray extends Component {
  state = {
    selectedRows: {}
  };

  componentDidMount() {
    this.addNewRow();
  }

  setDisableRowFields = (name, newValue) => {
    const { selectedRows } = this.state;
    selectedRows[name] = newValue;
    this.setState({ selectedRows: selectedRows });
  };

  addNewRow = () => {
    console.log("Add New Row");
    const { fields } = this.props;
    fields.push({ selected: false });
    console.log("1) ~~~~~~~~~ ", fields.getAll());
    if (fields.getAll()) {
      let fieldCount = 0;
      if (fields.getAll().length - 1 > -1) {
        fieldCount = fields.getAll().length - 1;
      }
      const isDisableState = "selected[" + fieldCount + "].selected";
      console.log("2) ~~~~~~~~~ ", isDisableState);
      this.setDisableRowFields(isDisableState, false);
    }
  };

  removeRow = () => {
    const { fields } = this.props;
    console.log("~~~~~~ RemoveRow :::>> ", fields);
    for (let i = fields.getAll().length - 1; i >= 0; i--) {
      if (fields.get(i) && fields.get(i).selected) {
        fields.remove(i);
      }
    }
  };

  onOrderSelectionChange = (event, newValue, previousValue, name) => {
    console.log(
      "~~~~~~~~~~ onOrderSelectionChange ~~~~~~~~~~~ ",
      event,
      newValue,
      previousValue,
      name
    );
    this.setDisableRowFields(name, newValue);
  };

  onSelectAll = (event, newValue, previousValue, name) => {
    console.log(
      "~~~~~~~~~~~ >>> onSelectAll <<< ~~~~~~~~~~~ ",
      event,
      newValue,
      previousValue,
      name
    );
    const { fields } = this.props;
    console.log("~~~~~~~~~~~ >>> onSelectAll ", fields.getAll());
    _.forEach(fields.getAll(), (item, index) => {
      console.log("~~~~~~~~~~~ >>> onSelectAll ", item, fields.get(index));
      if (fields.get(index)) {
        fields.get(index).selected = newValue;
        const isDisableState = "selected[" + index + "].selected";
        console.log("2) ~~~~~~~~~ ", isDisableState);
        this.setDisableRowFields(isDisableState, newValue);
      }
    });
  };

  render() {
    const {
      fields,
      meta: { touched, error, submitFailed }
    } = this.props;
    return (
      <SubscribeFleetConsumer>
        {() => (
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <div>Subscribe Fleet</div>
              </div>
            </div>
            <div className="card-body">
              <div className="container">
                <table className="table table-borderless">
                  <tr>
                    <th>
                      <Field
                        name="selectAll"
                        type="checkbox"
                        onChange={this.onSelectAll}
                        component="input"
                      />
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                  {fields.map((member, index) => (
                    <tr key={index}>
                      <td>
                        <Field
                          name={`${member}.selected`}
                          type="checkbox"
                          onChange={this.onOrderSelectionChange}
                          component="input"
                        />
                      </td>
                      <td>
                        <Field
                          name={`${member}.firstName`}
                          type="text"
                          component="input"
                          disabled={
                            !this.state.selectedRows[`${member}.selected`]
                          }
                        />
                      </td>
                      <td>
                        <Field
                          name={`${member}.lastName`}
                          type="text"
                          component="input"
                          disabled={
                            !this.state.selectedRows[`${member}.selected`]
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </table>
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
                  onClick={() => this.removeRow()}
                >
                  <i className="fa fa-minus" />
                </button>
              </div>
            </div>
          </div>
        )}
      </SubscribeFleetConsumer>
    );
  }
}

export default FleetFieldArray;
