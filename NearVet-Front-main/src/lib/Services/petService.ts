import { FormNewPet } from "@/types/interfaces";
import { fetcher, fetcherImg } from "../fetcher";

const PETS_USER = process.env.NEXT_PUBLIC_PETS_USER;
const PETS = process.env.NEXT_PUBLIC_PETS;
const SPECIES = process.env.NEXT_PUBLIC_SPECIES;
const RACES = process.env.NEXT_PUBLIC_RACES;
const PET_SEX = process.env.NEXT_PUBLIC_PETS_SEX;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const MODIFI_USER = process.env.NEXT_PUBLIC_MODIFI_USER;
export const fetchPetsService = async (userId: string, token: string) => {
  const dataPets = {
    url: `${PETS_USER}/${userId}`,
    method: "GET" as const,
    token,
  };
  try {
    const responsePets = await fetcher(dataPets);
    if (!responsePets) throw new Error(responsePets.message);
    return responsePets;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const fetchPetIdService = async (idPet: string, token: string) => {
  const dataPet = {
    url: `${PETS}/${idPet}`,
    method: "GET" as const,
    token,
  };
  try {
    const responsePet = await fetcher(dataPet);
    if (!responsePet.id) throw new Error(responsePet.message);
    return responsePet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addPetService = async (values: FormNewPet, token: string) => {
  const dataPet = {
    url: PETS as string,
    method: "POST" as const,
    data: values,
    token,
  };
  try {
    const responsePet = await fetcher(dataPet);
    if (!responsePet.id) throw new Error(responsePet.message);
    return responsePet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const modifyPetService = async (
  values: FormNewPet,
  petId: string,
  token: string
) => {
  const dataModify = {
    url: `${PETS}/${petId}`,
    method: "PUT" as const,
    data: values,
    token,
  };
  try {
    const responseModify = await fetcher(dataModify);
    if (!responseModify.id) throw new Error(responseModify.message);
    return responseModify;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const modifyImgPetService = async (
  Id: string,
  token: string,
  File: any,
  type: "profile" | "pet"
) => {
  const dataModify = {
    url:
      type === "profile"
        ? `${MODIFI_USER}/imgProfile/${Id}`
        : `${PETS}/imgProfile/${Id}`,
    method: "PUT" as const,
    data: File,
    token,
  };
  try {
    const responseModify = await fetcherImg(dataModify);
    if (!responseModify.id) throw new Error(responseModify.message);
    return responseModify;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const Species = async () => {
  const response = await fetch(`${API_BASE_URL}${SPECIES}`, {
    method: "GET",
  });
  return response.json();
};
export const Races = async (especie: string) => {
  const response = await fetch(`${API_BASE_URL}${RACES}/${especie}`, {
    method: "GET",
  });
  return response.json();
};

export const SexType = async () => {
  const response = await fetch(`${API_BASE_URL}${PET_SEX}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
