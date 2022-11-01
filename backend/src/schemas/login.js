import * as yup from "yup";
import spanish from "yup-es";

yup.setLocale(spanish);

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().min(10).max(80).required().label("El correo"),
    password: yup.string().min(10).max(80).required().label("La contraseña"),
  }),
});
