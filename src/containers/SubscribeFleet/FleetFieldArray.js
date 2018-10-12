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
          <div style={{ display: "flex", marginTop: "1rem" }} key={index}>
            <div style={{ flex: 1, order: 1, width: "10%" }}>
              <Field
                name={`${member}.selected`}
                type="checkbox"
                component="input"
              />
            </div>
            <div style={{ order: 2, width: "45%" }}>
              <Field
                name={`${member}.firstName`}
                type="text"
                component="input"
              />
            </div>
            <div style={{ order: 2, width: "45%" }}>
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
