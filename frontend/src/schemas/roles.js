import * as yup from "yup";
import es from "yup-es";
yup.setLocale(es);

export const createRol = yup
  .object({
    name: yup.string().min(3).max(200).required().label("El nombre"),
    permissions: yup.array().required("Selecciona al menos un permiso"),
  })
  .required();
