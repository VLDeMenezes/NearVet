import { FormRegisterValues, FormValues } from "@/types/interfaces";
import { ErrorNotify, PromessNotify } from "../toastyfy";
import {
  LoginService,
  registerGoogleService,
  registerService,
} from "../Services/userService";

//authControllers
export const loginController = async (values: FormValues) => {
  values = {
    ...values,
    dni: Number(values.dni),
  };

  try {
    const response = await PromessNotify(
      "Iniciando sesión...",
      "Iniciaste sesión exitosamente",
      LoginService(values)
    );
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al Iniciar sesión: ${error.message}`);
  }
};

export const registerUserController = async (values: FormRegisterValues) => {
  values = {
    ...values,
    startDate: new Date(),
    dni: Number(values.dni),
  };
  try {
    const response = await PromessNotify(
      "Registrandote...",
      "Registrado exitosamente",
      registerService(values)
    );

    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrarte: ${error.message}`);
  }
};

export const registerWithGoogleController = async (
  values: FormRegisterValues
) => {
  try {
    const response = await PromessNotify(
      "Iniciando Sesión...",
      "Inicio exitosamente",
      registerGoogleService(values)
    );
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrarte: ${error.message}`);
  }
};
