import * as yup from "yup";
// SignUp.js
export const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Solo acepta letras")
    .matches(/(\w.+\s).+/, "Ingrese al menos dos nombres")
    .required("El nombre completo es obligatorio")
    .typeError("Ingrese nombre y apellido"),
  phoneNumber: yup
    .string()
    .matches(
      /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
      "Enter a valid phone number"
    )
    .required("El numero de telefono es obligatorio"),
  email: yup
    .string()
    .email("Ingrese un mail valido")
    .required("El email es obligatorio")
    .typeError("Ingrese un mail valido"),
  password: yup
    .string()
    .min(4, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required("La contraseña es obligatoria")
    .typeError("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debe confirmar su contraseña")
    .typeError("Debe confirmar su contraseña"),
});
