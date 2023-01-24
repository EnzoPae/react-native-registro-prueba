import * as yup from "yup";

export const crearViajeValidationSchema = yup.object().shape({
  cantidad: yup
    .string()
    .matches(/^[0-9]*$/, "Solo acepta numeros")
    .required("Este campo es obligatorio")
    .typeError("Este campo es obligatorio"),
  distancia: yup
    .string()
    .required("Este campo es obligatorio")
    .typeError("Este campo es obligatorio"),
});