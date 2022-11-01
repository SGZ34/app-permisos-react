import * as yup from "yup";
import es from "yup-es";
yup.setLocale(es);

export const updatePasswordSchema = yup
  .object({
    password: yup.string().min(10).max(100).required().label("La contraseña"),
    newPassword: yup
      .string()
      .min(10)
      .max(80)
      .required()
      .label("La nueva contraseña"),
    confirmPassword: yup
      .string()
      .min(10)
      .max(80)
      .required()
      .oneOf([yup.ref("newPassword")], "Las contraseñas deben ser iguales")
      .label("La confirmación de contraseña"),
  })
  .required();
