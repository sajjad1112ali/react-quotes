import React from "react";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import MUIInput from "./Input";
import RadioButton from "./RadioButton";
import Select from "./Select";
import Textarea from "./Textarea";

function FormikControll(props) {
  const { controll, ...rest } = props;

  switch (controll) {
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "mui-radio":
      return <RadioButton {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "mui-input":
      return <MUIInput {...rest} />;
    case "mui-input-file":
      return <MUIInput {...rest} />;

    default:
      return null;
  }
}

export default FormikControll;
