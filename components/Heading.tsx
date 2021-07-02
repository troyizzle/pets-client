interface HeadingProps {
  type: string,
  text: string
}

const Heading = (props: HeadingProps): JSX.Element => {
  let className = "font-extrabold text-gray-900 leading-9 ";

  if (props.type == "h1") {
    className += "text-3xl";
  } else if (props.type == "h2") {
    className += "text-2xl"
  } else if (props.type == "h3") {
    className += "text-xl"
  }

  return (
    <div className={className}>
      {props.text}
    </div>
  )
}

export default Heading;
