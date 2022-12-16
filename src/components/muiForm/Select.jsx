import React from "react";
import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { Field } from "formik";

function mSelect(props) {
  const { label, name, options, ...rest } = props;

  return (
    <Field name={name} {...rest}>
      {({ field, form }) => {
        return (
          <TextField
            select
            variant="outlined"
            fullWidth
            error={form.touched[name] && Boolean(form.errors[name])}
            helperText={form.touched[name] && form.errors[name]}
            {...rest}
            {...field}
            name={name}
            id={name}
            sx={{ mt: 2 }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    </Field>
  );
}

export default mSelect;
