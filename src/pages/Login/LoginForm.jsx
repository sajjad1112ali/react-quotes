import React from "react";
import { Box, Button } from "@mui/material";

import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikControll from "./FormikControll";

function MUICourseEnrollmentForm() {
  const dropdownOptions = [
    { value: "", label: "Select Course" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
  ];

  const checkboxOptions = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "laravel", label: "Laravel" },
    { value: "javascript", label: "Javascript" },
    { value: "nodejs", label: "NodeJs" },
    { value: "php", label: "PHP" },
  ];
  const initialValues = {
    email: "",
    bio: "",
    course: "",
    skillSet: [],
    courseDate: null,
  };
  const onSubmit = (values, onSubmitProps) => {
    setTimeout(() => {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    }, 1000);
  };

  const validationSchema = yup.object({
    email: yup.string().required("Required").email("Invalid email address"),
    bio: yup.string().required("Required"),
    course: yup.string().required("Required"),
    skillSet: yup.array().min(1, "Required"),
    courseDate: yup.date().required("Required").nullable(),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      {(formik) => {
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
                        type="email"
                        label="Email"
                        name="email"
                      />
                      <FormikControll
                        controll="textarea"
                        label="About"
                        name="bio"
                        sx={{ mt: 2 }}
                      />
                      <FormikControll
                        controll="select"
                        label="Course To Enroll"
                        name="course"
                        options={dropdownOptions}
                      />
                      <FormikControll
                        controll="checkbox"
                        label="Skill Set"
                        name="skillSet"
                        options={checkboxOptions}
                      />
                      <FormikControll
                        controll="date"
                        label="Date"
                        name="courseDate"
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
      }}
    </Formik>
  );
}

export default MUICourseEnrollmentForm;
