import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import * as yup from "yup";
import FormikControll from "./FormikControll";

function MUILoginForm() {
  const initialValues = {
    name: "",
    email: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    setTimeout(() => {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    }, 1000);
  };

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid email address"),
  });

  return (
    <Box autoComplete="off">
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => {
          return (
            <Box
              height="100vh"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Form noValidate>
                <FormikControll
                  controll="mui-input"
                  type="text"
                  label="Name"
                  name="name"
                />
                <FormikControll
                  controll="mui-input"
                  type="text"
                  label="Email"
                  name="email"
                  sx={{ mt: 2 }}
                />
                <Box textAlign="center">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}

export default MUILoginForm;
