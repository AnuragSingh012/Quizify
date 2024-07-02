import React from "react";

const FormField = ({ name, id, type, label, placeholder }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input name={name} id={id} type={type} placeholder={placeholder} />
    </>
  );
};

export default FormField;
