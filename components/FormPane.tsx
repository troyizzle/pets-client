interface FormPaneProps {
  children: any
}


const FormPane = (props: FormPaneProps): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-96 p-8 bg-white rounded shadow">{props.children}</div>
    </div>
  )
}

export default FormPane;
