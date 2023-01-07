import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import { Box, Button, Alert } from "@mui/material";
import * as yup from "yup";
import FormikControll from "../../components/muiForm/FormikControll";
import { rigisterUser } from "../../redux";
import { getToken } from "../../redux/utils";

function Register() {
  const navigate = useNavigate();

  const authenticationData = useSelector((state) => state.authentication);
  const { error } = authenticationData;
  const dispatch = useDispatch();
  const token = getToken();

  const initialValues = {
    email: "",
    password: "",
    name: "",
    phone_number: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    dispatch(rigisterUser(values, navigate, onSubmitProps));
  };

  const validationSchema = yup.object({
    email: yup.string().required("Required").email("Invalid email address"),
    password: yup.string().required("Required"),
    name: yup.string().required("Required"),
    phone_number: yup.string().required("Required"),
  });

  if (token) {
    navigate("/", { replace: true });
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box autoComplete="off">
          <Formik
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            initialValues={initialValues}
          >
            {(formik) => {
              return (
                <Form className="loginForm" noValidate>
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
                    type="password"
                    label="Password"
                    name="password"
                    sx={{ mt: 2, mb: 2 }}
                  />
                  <FormikControll
                    controll="mui-input"
                    type="text"
                    label="Name"
                    name="name"
                    sx={{ mt: 2, mb: 2 }}
                  />
                  <FormikControll
                    controll="mui-input"
                    type="text"
                    label="Phone Number"
                    name="phone_number"
                    sx={{ mt: 2, mb: 2 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button component={Link} to="/login">
                      Login
                    </Button>
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
              );
            }}
          </Formik>
        </Box>
      </Box>
    );
  }
}

export default Register;
