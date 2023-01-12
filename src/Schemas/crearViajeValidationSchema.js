import * as yup from "yup";

export const crearViajeValidationSchema = yup.object().shape({
  origen: yup
    .string()
    .required("La ubicacion de origen es obligatoria")
    .typeError("Este campo es obligatorio"),
  destino: yup
    .string()
    .required("La ubicacion de destino es obligatoria")
    .typeError("Este campo es obligatorio"),
  cantidad: yup
    .string()
    .matches(/^[0-9]*$/, "Solo acepta numeros")
    .required("Este campo es obligatorio")
    .typeError("Este campo es obligatorio"),
});