import { FormNewPet, User } from "@/types/interfaces";
import {
  addPetService,
  fetchPetIdService,
  fetchPetsService,
  modifyImgPetService,
  modifyPetService,
} from "../Services/petService";
import { ErrorNotify, PromessNotify } from "../toastyfy";

//petControllers
export const fetchPetsController = async (userId: string, token: string) => {
  try {
    const response = await fetchPetsService(userId, token);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus mascotas: ${error.message}`);
  }
};
export const fetchPetIdController = async (idPet: string, token: string) => {
  try {
    const response = await fetchPetIdService(idPet, token);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus mascotas: ${error.message}`);
  }
};
export const petController = async (
  values: FormNewPet,
  userId: string,
  token: string
) => {
  values = {
    ...values,
    userId: userId,
    startDate: new Date(),
    weightCurrent: Number(values.weightCurrent),
    birthdate: new Date(values.birthdate),
  };
  try {
    const response = await PromessNotify(
      "Registrando tu mascota...",
      "Registrada exitosamente",
      addPetService(values, token)
    );

    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrar la mascota: ${error.message}`);
  }
};

export const modifyPetController = async (
  values: FormNewPet,
  petId: string,
  token: string
) => {
  values = {
    ...values,
    weightCurrent: Number(values.weightCurrent),
  };
  try {
    const responseModify = await PromessNotify(
      "Modificando tu mascota...",
      "Modificada exitosamente",
      modifyPetService(values, petId, token)
    );
  } catch (error: any) {
    ErrorNotify(`Error al modificar la mascota: ${error.message}`);
  }
};

export const modifyImagenController = async (
  Id: string,
  token: string,
  File: any,
  type: "profile" | "pet"
): Promise<User | undefined> => {
  try {
    const responseModify = await PromessNotify(
      "Modificando la imagen...",
      "Modificada exitosamente",
      modifyImgPetService(Id, token, File, type)
    );
    return responseModify;
  } catch (error: any) {
    ErrorNotify(`Error al modificar la imagen: ${error.message}`);
  }
};
