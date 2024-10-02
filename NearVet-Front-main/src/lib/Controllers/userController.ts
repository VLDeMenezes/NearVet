import { FormRegisterValues } from "@/types/interfaces";
import { ErrorNotify, PromessNotify } from "../toastyfy";
import {
  BillEndService,
  BillModifyService,
  modifyUserService,
  ModifyVetService,
  NewVetService,
} from "../Services/userService";

//userControllers
export const modyfyUserController = async (
  values: FormRegisterValues,
  userId: string,
  token: string
) => {
  try {
    const responseModify = await PromessNotify(
      "Modificando tus datos...",
      "Modificado exitosamente",
      modifyUserService(values, userId, token)
    );
    return responseModify;
  } catch (error: any) {
    ErrorNotify(`Error al modificar tus datos: ${error.message}`);
  }
};

export const BillEndController = async (billId: string) => {
  try {
    const responseEnd = await PromessNotify(
      "Cerrando factura...",
      "Finalizacion exitosa",
      BillEndService(billId)
    );
    return responseEnd;
  } catch (error: any) {
    ErrorNotify(`Error al finalizar la factura: ${error.message}`);
  }
};

export const BillModifyController = async (values: any, billId: string) => {
  values = {
    ...values,
    discount: Number(values.discount),
  };
  try {
    const responseModify = await PromessNotify(
      "Aplicando datos a la factura...",
      "Aplicación exitosa",
      BillModifyService(values, billId)
    );
    return responseModify;
  } catch (error: any) {
    ErrorNotify(`Error al actualizar la factura: ${error.message}`);
  }
};

export const newVet = async (values: FormRegisterValues, token: string) => {
  values = {
    ...values,
    dni: Number(values.dni),
    licence: Number(values.licence),
    startDate: new Date(),
  };
  try {
    const responseVet = await PromessNotify(
      "Registrando nuevo veterinario...",
      "Registrado con exito",
      NewVetService(values, token)
    );
    return responseVet;
  } catch (error: any) {
    ErrorNotify(`Error al registrar al veterinario: ${error.message}`);
  }
};

export const ModifyVetController = async (
  values: any,
  idVet: string,
  token: string
) => {
  try {
    const responseVet = await PromessNotify(
      "Modificando Veterinaria...",
      "Modificada con exito",
      ModifyVetService(values, idVet, token)
    );
    return responseVet;
  } catch (error: any) {
    ErrorNotify(`Error al modificar la veterinaria: ${error.message}`);
  }
};
