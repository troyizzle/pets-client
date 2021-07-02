import { useField } from "formik"
import clsx from "clsx"

interface InputProps {
  label?: string,
  name: string,
  value?: string,
  type: string
}

const Input = (props: InputProps) => {
  const [field, meta, helpers] = useField(props)

  const styling = clsx("block w-full p-3 placeholder-gray-500 border appearce-none rounded focus:outline-none",
    meta.error && meta.touched ? "focus:shadow-outline-red focus:border-red-300 border-red-500" :
      "focus:shadow-outline-blue focus:border-blue-500 border-gray-300"
  )

  return (
    <div>
      {props.label && (
        <>
          <label htmlFor={field.name}>
            {props.label}
          </label>
        </>
      )}
      <input className={styling} {...field} {...props} />
    </div>
  )
}

export default Input;
