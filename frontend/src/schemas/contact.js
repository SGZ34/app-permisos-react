import * as yup from "yup";
import es from "yup-es";
yup.setLocale(es);

export const contactSchema = yup
  .object({
    name: yup.string().min(3).max(200).required().label("El nombre"),
    email: yup.string().email().min(10).max(200).required().label("El correo"),
    message: yup.string().min(12).max(250).required().label("El mensaje"),
  })
  .required();
