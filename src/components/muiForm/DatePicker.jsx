import React from "react";
import { TextField } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { Field } from "formik";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function MUIDatePicker(props) {
  const { label, name, options, ...rest } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              onChange={(val) => setFieldValue(name, val)}
              label={label}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{ mt: 2 }}
                  id={name}
                  {...field}
                  {...rest}
                  error={form.touched[name] && Boolean(form.errors[name])}
                  helperText={form.touched[name] && form.errors[name]}
                />
              )}
            />
          );
        }}
      </Field>
    </LocalizationProvider>
  );
}

export default MUIDatePicker;
