import * as yup from "yup";

export const crearViajeValidationSchema = yup.object().shape({
  cantidad: yup
    .string()
    .matches(/^[0-9]*$/, "Solo acepta numeros")
    .required("Obligatorio")
    .typeError("Obligatorio"),
  distancia: yup
    .string()
    .matches(/^[0-9]*$/, "Solo acepta numeros")
    .required("Campo obligatorio")
    .typeError("Campo obligatorio"),
  tarifa: yup
    .string()
    .matches(/^[0-9]*$/, "Solo acepta numeros")
    .required("Campo obligatorio")
    .typeError("Campo obligatorio"),
});
