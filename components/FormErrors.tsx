import InlineAlert from "./InlineAlert"

interface FormErrorsProps {
  errors: any,
  touched: any,
  status: string
}

const errorMsg = (e: object | string) => (typeof e === "object" ? Object.values(e)[0] : e);

const FilterClientErrors = (props: FormErrorsProps): any[] => {
  const { touched, errors } = props;
  let clientErrors: any[] = [];

  Object.entries(errors).map((error: any) => {
    if (touched[error[0]]) {
      const errorMessage = errorMsg(error[1])
      clientErrors.push(errorMessage)
    }
  })

  return clientErrors;
}

const FiltterServerErrors = (status: string) => {
  if (typeof status !== "undefined") {
    return [status]
  } else {
    return [];
  }
}

const FormErrors = (props: FormErrorsProps): JSX.Element => {
  return (
    <InlineAlert
      errors={FilterClientErrors(props).concat(
        FiltterServerErrors(props.status)
      )}
    />
  )
}

export default FormErrors;
