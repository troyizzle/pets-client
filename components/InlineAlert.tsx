import { useTranslation } from "react-i18next"
import "../utils/i18n"

interface InlineAlertProps {
  errors: any[] | undefined
}

const InlineAlert = (props: InlineAlertProps): JSX.Element | null => {
  const { t } = useTranslation();

  const errorMsg = (e: any) => (typeof e === "object" ? Object.values(e)[0] : e);

  if (typeof props.errors === "undefined") {
    return null;
  } else if (props.errors.length < 1) {
    return null;;
  } else {
    return (
      <div className="p-5 my-8 bg-red-100 rounded">
        <h3 className="font-bold text-red-600">
          {t("forms.errors.title")}
        </h3>
        <div className="mt-2 text-red-500">
          <ul className="pl-5 list-disc">
            {props.errors.map((error: any, index: number) => (
              <li className="mt-1" key={`error=${index}`}>
                {errorMsg(error)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default InlineAlert;
