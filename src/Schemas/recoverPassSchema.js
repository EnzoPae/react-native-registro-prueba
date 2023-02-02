import * as yup from "yup";

export const recoverPassValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un mail valido")
    .required("El email es obligatorio")
    .typeError("Ingrese un mail valido"),
});
