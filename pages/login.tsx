import { guestsOnly, saveToken } from "../services/TokenService"
import { useTranslation } from "react-i18next";
import Head from "next/head"
import Link from "next/link";
import FormPane from "../components/FormPane";
import Heading from "../components/Heading";
import { APIRequest } from "../services/APIRequest";
import { useAuth } from "../services/AuthStateContext";
import { Formik, Form } from "formik";
import { loginSchema } from "../services/ValidationService";
import paths from "../utils/Paths";
import FormErrors from "../components/FormErrors";
import Input from "../components/Input";
import Button from "../components/Button";
import { redirect } from "../services/NavService";

const Login = () => {
  const { t } = useTranslation();
  const [user, dispatch] = useAuth();

  return (
    <div>
      <Head>
        <title>
          {t("pages.login.headings.title")}
        </title>
      </Head>
      <FormPane>
        <Heading type="h1" text={t("pages.login.headings.h1")} />
        <div className="my-4 text-gray-500">
          {t("pages.login.no_account.description")}{" "}
          <Link href="/signup">{t("pages.login.no_account.link")}</Link>
        </div>
        <div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(
              values,
              {
                setSubmitting,
                setStatus
              }
            ) => {
              APIRequest(paths.login, "post", { user: values })
                .then((res) => {
                  if (res.status === 200) {
                    const { data } = res
                    saveToken(res.headers["authorization"]).then(() => {
                      dispatch({ type: "setAuth", payload: data })
                      redirect("/")
                    })
                  }
                })
                .catch((err) => {
                  if (err.response.status === 401) {
                    setStatus(t("forms.errors.email_password_mismatch"));
                  }
                  setSubmitting(false)
                })
            }}
          >
            {({ errors, touched, status, isSubmitting }) => (
              <>
                <FormErrors
                  status={status}
                  errors={errors}
                  touched={touched}
                />
                <Form className="space-y-6">
                  <Input
                    type="email"
                    name="email"
                    label={t("forms.labels.email")}
                  />
                  <Input
                    type="password"
                    name="password"
                    label={t("forms.labels.password")}
                  />
                  <Button
                    type="submit"
                    primary={true}
                    wide={true}
                    disabled={isSubmitting}
                    label={t("pages.login.buttons.submit")}
                  />
                </Form>
              </>
            )}
          </Formik>
        </div>
      </FormPane>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  guestsOnly(context)
  return { props: {} }
}

export default Login;
