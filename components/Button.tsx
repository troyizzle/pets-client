import Link from "next/link"

enum Size {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

interface ButtonProps {
  onClick?: undefined | any,
  buttonConfirm?: boolean,
  type: string,
  label: string,
  href?: string,
  disabled: boolean,
  primary?: boolean,
  size?: Size,
  wide?: boolean
}

const Button = ({ onClick = undefined,
  buttonConfirm = false,
  type,
  label,
  href = "#",
  disabled,
  primary = true,
  size = Size.Medium,
  wide = false }: ButtonProps) => {
  const _onClick = (e: any) => {
    if (typeof onClick !== "undefined") {
      e.preventDefault();
      return onClick();
    }

    if (buttonConfirm && !confirm("Are you sure?")) {
      e.preventDefault();
      return false;
    }
  };

  let wrapperClass = "rounded-sm ";
  let buttonClass = "border border-transparent cursor-pointer "

  if (wide) {
    wrapperClass += "block w-full ";
    buttonClass += "w-full "
  } else {
    wrapperClass += "inline-flex "
  }

  if (primary) {
    wrapperClass += "shadow-sm ";
    buttonClass +=
      "font-base text-white bg-blue-500 hover:bg-blue-300-darker focus:outline-none ";
  } else {
    buttonClass +=
      "font-bold text-blue-500 border-gray-300 hover:border-gray-300 bg-transparent focus:outline-none "
  }

  if (disabled) {
    buttonClass += "opacity-50 cursor-not-allowed ";
  }

  if (size === "small") {
    buttonClass += "px-2 py-1 text-xs leading-4 rounded-sm ";
  } else if (size === "large") {
    buttonClass += "py-3 px-6 text-xl leading-6 rounded "
  } else {
    buttonClass += "py-2 px-4 text-base leading-5 rounded-sm "
  }

  if (type == "link") {
    return (
      <span className={wrapperClass} onClick={_onClick}>
        <Link href={href}>
          <a className={`no-underline ${buttonClass}`}>{label}</a>
        </Link>
      </span>
    )
  } else {
    return (
      <span className={wrapperClass}>
        <button
          disabled={disabled}
          onClick={_onClick}
          className={buttonClass}
        >
          {label}
        </button>
      </span>
    )
  }
}

export default Button;
