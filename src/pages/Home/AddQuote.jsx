import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import { Box, Button, Alert } from "@mui/material";
import * as yup from "yup";
import FormikControll from "../../components/muiForm/FormikControll";
import { addQuote, getSingleQuote, updateQuote } from "../../redux";

function AddQuote() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const isAddMode = !id;

  const quotesData = useSelector((state) => state.quotes);
  const { addBlogError, singleQuote } = quotesData;
  useEffect(() => {
    if (!isAddMode) {
      dispatch(getSingleQuote(id));
    }
  }, []);
  let initialValues = {};

  if (singleQuote) {
    initialValues = {
      quote: singleQuote.quote,
    };
  } else {
    initialValues = {
      quote: "",
    };
  }
  const onSubmit = (values, onSubmitProps) => {
    if (!isAddMode) {
      dispatch(updateQuote(id, values, onSubmitProps, navigate));
    } else {
      dispatch(addQuote(values, onSubmitProps, navigate));
    }
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
        enableReinitialize
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
                    {!isAddMode ? "Update" : "Add"}
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
