import React from "react";

const FormField = ({
  name,
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  checked,
  labelFirst = true,
  inputClass,
  labelClass,
  disabled,
}) => {
  return (
    <>
      {labelFirst ? (
        <>
          <label className={labelClass} htmlFor={id}>
            {label}
          </label>
          <input
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            checked={checked}
            className={inputClass}
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <input
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            checked={checked}
            className={inputClass}
            disabled={disabled}
          />
          <label className={labelClass} htmlFor={id}>
            {label}
          </label>
        </>
      )}
    </>
  );
};

export default FormField;
