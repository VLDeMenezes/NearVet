import * as Yup from "yup";
//funcion para validar dias habiles
const addBusinessDays = (date: Date, days: number) => {
  let count = 0;
  let result = new Date(date);
  while (count < days) {
    result.setDate(result.getDate() + 1);
    // Si no es domingo (0), contamos como día hábil
    if (result.getDay() !== 0) {
      count++;
    }
  }
  return result;
};
const today = new Date();
today.setHours(0, 0, 0, 0); // Elimina las horas para comparar solo la fecha
const maxDate = addBusinessDays(today, 7);

// Esquema de validación para registrar user
export const registrationValidationSchema = {
  nombre: Yup.string(),
  apellido: Yup.string(),
  DNI: Yup.string().matches(
    /^[0-9]+$/,
    "El DNI solo puede contener números, sin guiones ni espacios."
  ),
  email: Yup.string()
    .email("Email no es válido")

    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      "Ingresa un email valido. Ejemplo: abc@example.com"
    ),
  password: Yup.string()
    .min(8, "Contraseña debe tener al menos 8 caracteres")

    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Tiene que ser al menos una Mayúscula, Minúscula, número y un caracter especial."
    ),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Las contraseñas no coinciden"
  ),
  phone: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Ingresa un telefono valido. Ejemplo: 12345678"
  ),
  address: Yup.string().min(1, "La dirección debe tener 1 o más caracteres"),
  city: Yup.string().min(1, "La ciudad debe tener 1 o más caracteres"),
  birthDate: Yup.date().max(
    today,
    "La fecha de nacimiento no puede ser en el futuro"
  ),
};

// Esquema de validación para login
export const loginValidationSchema = {
  DNI: Yup.string()
    .matches(/^\d+$/, "DNI debe ser un número positivo")
    .max(8, "DNI no puede tener más de 8 dígitos")
    .required("DNI es obligatorio"),
  contrasenia: Yup.string().required("Contraseña es obligatoria"),
};

// Esquema de validación para creación de mascota
export const petCreationValidationSchema = {
  nombre: Yup.string().required("Nombre es obligatorio"),
  nacimiento: Yup.date()
    .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
    .min(
      new Date(new Date().setFullYear(new Date().getFullYear() - 50)),
      "La fecha de nacimiento no puede ser de más de 50 años atrás"
    ),
  color: Yup.string().required("Color es obligatorio"),
  especie: Yup.string().required("Especie es obligatoria"),
  raza: Yup.string().required("Raza es obligatoria"),
  sexo: Yup.string().required("Sexo es obligatorio"),
  pesoActual: Yup.number().min(0, "Peso no puede ser negativo"),
  observaciones: Yup.string(),
};

export const appointmentValidationSchema = {
  pet: Yup.string().required("Seleccionar una mascota es obligatorio"),
  date: Yup.date()
    .required("La fecha es obligatoria")
    .min(today, "Debes seleccionar a partir de hoy")
    .max(maxDate, "No puedes seleccionar una fecha más allá de 7 días hábiles")
    .test(
      "no-sunday",
      "No puedes seleccionar un domingo",
      (value) => value && value.getDay() !== 0
    ),
  time: Yup.string().required("Horario es obligatoria"),
  service: Yup.string().required("Seleccionar un servicio es obligatorio"),
  messageUser: Yup.string().required(
    "Debes indicarnos un motivo de la consulta"
  ),
  category: Yup.string().required("Seleccionar una categoria es obligatorio"),
};
