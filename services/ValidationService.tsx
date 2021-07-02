import * as Yup from "yup"
import i18n from "../utils/i18n"

export const loginSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("forms.errors.email.invalid"))
      .required(i18n.t("forms.errors.email.required")),
    password: Yup.string().required(i18n.t("forms.errors.password.required"))
  })
}

export const signupSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("forms.errors.email.invalid"))
      .required(i18n.t("forms.errors.email.required")),
    username: Yup.string().required(i18n.t("forms.errors.username.required")),
    password: Yup.string()
      .required(i18n.t("forms.errors.password.required"))
      .min(6, i18n.t("forms.errors.password.length"))
  })
}

export const petSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required(i18n.t("forms.errors.pet.name.required")),
    gender: Yup.string()
      .required(i18n.t("forms.errors.pet.gender.required"))
      .oneOf(["M", "F"], i18n.t("forms.errors.pet.gender.oneOf"))
  })
}
