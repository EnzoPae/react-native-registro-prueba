import * as yup from "yup";

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un mail valido")
    .required("El email es obligatorio")
    .typeError("Pone letras"),
  password: yup
    .string()
    .min(4, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required("La contraseña es obligatoria")
    .typeError("Pone letras"),
});
