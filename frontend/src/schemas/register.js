import * as yup from "yup";
import es from "yup-es";
yup.setLocale(es);

export const registerSchema = yup
  .object({
    name: yup.string().min(3).max(200).required().label("El nombre"),
    email: yup.string().email().min(10).max(200).required().label("El correo"),
    password: yup.string().min(10).max(100).required().label("La contraseña"),

    confirmPassword: yup
      .string()
      .min(10)
      .max(80)
      .required()
      .oneOf([yup.ref("password")], "Las contraseñas deben ser iguales")
      .label("La confirmación de contraseña"),
  })
  .required();
