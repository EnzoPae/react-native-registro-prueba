import * as yup from "yup";
// SignUp.js
export const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, "Enter at least 2 names")
    .required("El nombre completo es obligatorio")
    .typeError("Pone letras"),
  phoneNumber: yup
    .string()
    .matches(/(01)(\d){8}\b/, "Enter a valid phone number")
    .required("El numero de telefono es obligatorio"),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debe confirmar su contraseña")
    .typeError("Pone letras"),
});
