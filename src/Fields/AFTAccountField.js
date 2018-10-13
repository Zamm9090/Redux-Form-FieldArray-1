import React from "react";
import { Field } from "redux-form";

const AFTAccountField = ({ options }) => {
  console.log("~~~~~~~~~~ AFTAccountField >>> ", options);
  return (
    <Field name={options.fieldName} component="select">
      <option />
      {options.data.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.displayName}
          </option>
        );
      })}
    </Field>
  );
};

export default AFTAccountField;
