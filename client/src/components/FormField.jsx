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
  required,
}) => {
  return (
    <>
      {labelFirst ? (
        <>
          <label className={labelClass} htmlFor={id}>
            {label}
          </label>
          {type === "textarea" ? (
            <textarea
              name={name}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={inputClass}
              disabled={disabled}
              required={required}
              autoComplete="off"
            />
          ) : (
            <input
              name={name}
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              checked={checked}
              className={inputClass}
              required={required}
              disabled={disabled}
              autoComplete="off"
            />
          )}
        </>
      ) : (
        <>
          {type === "textarea" ? (
            <textarea
              name={name}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={inputClass}
              disabled={disabled}
              required={required}
              autoComplete="off"
            />
          ) : (
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
              required={required}
              autoComplete="off"
            />
          )}
          <label className={labelClass} htmlFor={id}>
            {label}
          </label>
        </>
      )}
    </>
  );
};

export default FormField;
