import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import { Box, Button, Alert } from "@mui/material";
import * as yup from "yup";
import FormikControll from "../../components/muiForm/FormikControll";
import { loginUser } from "../../redux";
import { getToken } from "../../redux/utils";

function MUILoginForm() {
  const navigate = useNavigate();

  const authenticationData = useSelector((state) => state.authentication);
  const { error } = authenticationData;
  const dispatch = useDispatch();
  const token = getToken();

  const initialValues = {
    email: "sajjadramzan1211@gmail.com",
    password: "SajjadHello1",
    // email: "",
    // password: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    dispatch(loginUser(values, navigate, onSubmitProps));
  };

  const validationSchema = yup.object({
    email: yup.string().required("Required").email("Invalid email address"),
    password: yup.string().required("Required"),
  });

  if (token) {
    navigate("/", { replace: true });
  } else {
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
                height="50vh"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Form noValidate>
                  {error ? <Alert severity="error">{error}</Alert> : null}

                  <FormikControll
                    controll="mui-input"
                    type="text"
                    label="Email"
                    name="email"
                    sx={{ mt: 2, mb: 2 }}
                  />
                  <FormikControll
                    controll="mui-input"
                    type="text"
                    label="Password"
                    name="password"
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
}

export default MUILoginForm;
