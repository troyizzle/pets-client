// @ts-nocheck
import Head from "next/head";
import { Formik, Form } from "formik"
import { signupSchema } from "../services/ValidationService";
import Input from "../components/Input"
import Button from "../components/Button"
import FormPane from "../components/FormPane";
import FormErrors from "../components/FormErrors"
import Heading from "../components/Heading"
import { useTranslation } from "react-i18next";
import { APIRequest } from "../services/APIRequest";
import paths from "../utils/Paths"
import { saveToken } from "../services/TokenService";
import _ from "lodash";
import { useAuth } from "../services/AuthStateContext";
import { redirect } from "../services/NavService";
import { guestsOnly } from "../services/TokenService";

const Signup = () => {
  const [user, dispatch] = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t("pages.signup.headings.title")}</title>
      </Head>
      <FormPane>
        <div className="text-center">
          <Heading type="h1" text={t("pages.signup.headings.h1")} />
        </div>
        <div className="pt-4">
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
            }}
            validationSchema={signupSchema}
            onSubmit={(
              values,
              {
                setSubmitting,
                setFieldError,
                setStatus,
                resetForm,
              }
            ) => {
              APIRequest(paths.signup, "post", { user: values })
                .then((res) => {
                  if (res.status === 200) {
                    const { data } = res.data
                    saveToken(res.headers["authorization"]).then(() => {
                      dispatch({ type: "setAuth", payload: data })
                      redirect("/")
                    })
                  }
                })
                .catch((err) => {
                  if (err.response.status === 422) {
                    const { error } = err.response.data
                    for (const [key, value] of Object.entries(error)) {
                      setFieldError(key, `${_.upperFirst(key)} ${value}`)
                    }
                  } else {
                    setStatus(t("forms.errors.server_error"))
                  }
                  setSubmitting(false)
                })
            }}
          >
            {({ values, errors, touched, status, isSubmitting, isValid, dirty }) => (
              <>
                <Form className="space-y-6">
                  <FormErrors
                    status={status}
                    errors={errors}
                    touched={touched}
                  />
                  <Input
                    type="email"
                    name="email"
                    label={t("forms.labels.email")}
                  />
                  <Input
                    type="text"
                    name="username"
                    label={t("forms.labels.username")}
                  />
                  <Input
                    type="password"
                    name="password"
                    label={t("forms.labels.password")}
                  />
                  <Button
                    disabled={isSubmitting || !isValid || !dirty}
                    type="submit"
                    label={t("pages.signup.buttons.submit")}
                    wide={true}
                    primary={true}
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
  guestsOnly(context);
  return { props: {} };
}

export default Signup;
