import React, { useState } from "react";
import { Field } from "formik";
import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

function RadioButton(props) {
  const [showError, setShowError] = useState(false);
  const { label, name, options, ...rest } = props;
  const errorObj = {};

  return (
    <Field name={name} {...rest}>
      {({ field, meta, form }) => {
        if (meta.error && meta.touched && meta.error) {
          errorObj.error = true;
        }
        return (
          <FormControl sx={{ mt: 2 }} {...errorObj}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {errorObj.error && (
              <FormHelperText className="color.error">
                {form.errors[name]}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
}

export default RadioButton;
