import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import { Box, Button, Alert } from "@mui/material";
import * as yup from "yup";
import FormikControll from "../../components/muiForm/FormikControll";
import { addQuote } from "../../redux";

function AddQuote() {
  const navigate = useNavigate();

  const quotesData = useSelector((state) => state.quotes);
  const { addBlogError } = quotesData;
  const dispatch = useDispatch();

  const initialValues = {
    quote: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    dispatch(addQuote(values, onSubmitProps, navigate));
  };

  const validationSchema = yup.object({
    quote: yup
      .string()
      .min(30, "Too Short!")
      .max(600, "Too Long!")
      .required("Required"),
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
              height="50vh"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Form className="addQuoteForm" noValidate>
                {addBlogError ? (
                  <Alert px={2} severity="error">
                    {addBlogError}
                  </Alert>
                ) : null}

                <FormikControll
                  controll="mui-input"
                  type="text"
                  label="Quote"
                  name="quote"
                  multiline
                  rows={4}
                  sx={{ mt: 2, mb: 2 }}
                />
                <Box textAlign="center">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    Add
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

export default AddQuote;
