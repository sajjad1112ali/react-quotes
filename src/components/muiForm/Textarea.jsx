import React from "react";
import TextField from "@mui/material/TextField";
import { Field } from "formik";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <Field name={name} {...rest}>
      {({ field, form }) => {
        return (
          <TextField
            error={form.touched[name] && Boolean(form.errors[name])}
            id={name}
            fullWidth
            required
            label={label}
            helperText={form.touched[name] && form.errors[name]}
            multiline
            rows={4}
            {...rest}
            {...field}
          />
        );
      }}
    </Field>
  );

}

export default Textarea;
