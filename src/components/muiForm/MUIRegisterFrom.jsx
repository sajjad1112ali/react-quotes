import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import * as yup from "yup";
import FormikControll from "./FormikControll";

function MUIRegisterFrom() {
  const radioOptions = [
    { value: "email", label: "Email" },
    { value: "telephone", label: "Telephone" },
  ];
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    modeOfContact: "",
    phone: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid email address"),
    password: yup.string().required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Password must matched")
      .required("Required"),
    modeOfContact: yup.string().required("Required"),
    phone: yup.string().when("modeOfContact", {
      is: "telephone",
      then: yup.string().required("Required"),
    }),
  });

  const onSubmit = (values, onSubmitProps) => {
    setTimeout(() => {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    }, 1000);
  };

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
                  type="email"
                  label="Email"
                  name="email"
                  sx={{ mt: 2 }}
                />

                <FormikControll
                  controll="mui-input"
                  type="password"
                  label="Password"
                  name="password"
                  sx={{ mt: 2 }}
                />
                <FormikControll
                  controll="mui-input"
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  sx={{ my: 2 }}
                />
                <FormikControll
                  controll="mui-radio"
                  label="Mode Of Contact"
                  name="modeOfContact"
                  options={radioOptions}
                />
                <FormikControll
                  controll="mui-input"
                  type="text"
                  label="Phone"
                  name="phone"
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

export default MUIRegisterFrom;
