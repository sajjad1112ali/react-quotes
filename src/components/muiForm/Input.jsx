import React from "react";
import TextField from "@mui/material/TextField";
import { Field } from "formik";

export default function Input(props) {
  const { label, name, options, ...rest } = props;

  return (
    <Field name={name} {...rest}>
      {({ field, form }) => {
        return (
          <TextField
            error={form.touched[name] && Boolean(form.errors[name])}
            helperText={form.touched[name] && form.errors[name]}
            id={name}
            fullWidth
            required
            label={label}
            {...rest}
            {...field}
          />
        );
      }}
    </Field>
  );
}
