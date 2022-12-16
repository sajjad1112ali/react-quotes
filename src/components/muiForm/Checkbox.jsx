import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

function MUICheckbox(props) {
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
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Checkbox
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
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

export default MUICheckbox;
