import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Box, Button } from "@mui/material";

import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikControll from "../../components/muiForm/FormikControll";
import CommentsList from "./CommentsList";
import { addComment } from "../../redux";
function Chat() {
  const reduxComments = useSelector((state) => state.comments.commnets);
  const dispatch = useDispatch();

  const initialValues = {
    message: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    setTimeout(() => {
      dispatch(addComment(values));
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    }, 1000);
  };

  const validationSchema = yup.object({
    message: yup.string().required("Required"),
  });

  return (
    <Container maxWidth="xl">
      <CommentsList comments={reduxComments} />
      <Box>
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {(formik) => {
            return (
              <Box>
                <Form noValidate>
                  <FormikControll
                    controll="mui-input"
                    type="text"
                    label="Type your message"
                    name="message"
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
    </Container>
  );
}

export default Chat;
