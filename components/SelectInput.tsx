import { Field, useField } from "formik";
import React from "react";
import clsx from "clsx"

interface SelectInputProps {
  label: string,
  name: string,
  options: any[]
}

const SelectInput = (props: SelectInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);

  const { label, name, options, ...rest } = props;

  const fieldStyling = clsx(
    "block w-full p-3 placeholder-gray-500 border appearance-none rounded focus:outline-none",
    meta.error && meta.touched ? "focus:shadow-outline-red focus:border-red-300 border-red-500" :
      "focus:shadow-outline-blue focus:border-blue-500 border-gray-300"
  )

  return (
    <div className="my-4">
      {label && (
        <label className="block mb-2 text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}
      <Field
        as="select"
        className={fieldStyling}
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
    </div>
  )
}

export default SelectInput;
