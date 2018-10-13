import React, { Component } from "react";
import { Field } from "redux-form";
import AFTAccountField from "./../../Fields/AFTAccountField";

class AFTOrderEntryFormRow extends Component {
  render() {
    const { fields, options, meta } = this.props;
    const { touched, error, submitFailed } = meta;
    console.log("~~~~~~~~~ AFTOrderEntryFormRow ", meta, fields, options);
    console.log(fields.getAll());
    return (
      <div>
        <div>
          {error && fields.getAll().length === 0 ? (
            <div
              style={{
                borderTop: "1px solid gray",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <h6>{error}</h6>
            </div>
          ) : (
            ""
          )}
        </div>
        {fields.map((member, index) => (
          <div key={index} style={{ display: "flex", marginTop: "1rem" }}>
            <div style={{ flex: 1, order: 1, width: "10%" }}>
              <Field
                name={`${member}.selected`}
                type="checkbox"
                component="input"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                order: 2,
                width: "45%"
              }}
            >
              <Field name={`${member}.account`} component="select">
                <option />
                {this.props.options.accounts.map((item, index) => {
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
