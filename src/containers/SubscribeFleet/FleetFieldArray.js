import React, { Component } from "react";
import { Field } from "redux-form";

class FleetFieldArray extends Component {
  render() {
    const {
      fields,
      meta: { touched, error, submitFailed }
    } = this.props;
    return (
      <div>
        {fields.map((member, index) => (
          <div className="d-flex" key={index}>
            <div className="p-2 flex-fill">
              <Field
                name={`${member}.selected`}
                type="checkbox"
                component="input"
              />
            </div>
            <div className="p-2 flex-fill">
              <Field
                name={`${member}.firstName`}
                type="text"
                component="input"
              />
            </div>
            <div className="p-2 flex-fill">
              <Field
                name={`${member}.lastName`}
                type="text"
                component="input"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FleetFieldArray;
