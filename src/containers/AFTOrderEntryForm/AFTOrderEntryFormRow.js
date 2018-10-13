import React, { Component } from "react";
import { Field } from "redux-form";
import AFTAccountField from "./../../Fields/AFTAccountField";

class AFTOrderEntryFormRow extends Component {
  render() {
    const { fields, options } = this.props;
    console.log("~~~~~~~~~ AFTOrderEntryFormRow ", fields, options);
    return (
      <div>
        {fields.map((member, index) => (
          <div key={index} style={{ display: "flex", marginTop: "1rem" }}>
            <div style={{ flex: 1, order: 1, width: "10%" }}>
              <Field
                name={`${member}.selected`}
                type="checkbox"
                component="input"
              />
            </div>
            <div style={{ order: 2, width: "45%" }}>
              <Field name={`${member}.accounts`} component="select">
                <option />
                {options.accounts.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.displayName}
                    </option>
                  );
                })}
              </Field>
            </div>
            <div style={{ order: 2, width: "45%" }} />
          </div>
        ))}
      </div>
    );
  }
}
export default AFTOrderEntryFormRow;
