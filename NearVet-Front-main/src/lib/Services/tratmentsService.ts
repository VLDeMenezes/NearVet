import { fetcher } from "../fetcher";

const TREATMENT_PET = process.env.NEXT_PUBLIC_TREATMENT_PET;
const TREATMENT_PRODUCT = process.env.NEXT_PUBLIC_TREATMENT_PRODUCT;
const PRESCRIPTION_PET = process.env.NEXT_PUBLIC_PRESCRIPTION_PET;

export const fetchTratmentPetService = async (idPet: string) => {
  const data = {
    url: `${TREATMENT_PET}/${idPet}`,
    method: "GET" as const,
  };
  const response = await fetcher(data);
  if (!response) throw new Error(response.message);
  return response;
};
export const fetchRecetaPetService = async (idPet: string) => {
  const data = {
    url: `${PRESCRIPTION_PET}/${idPet}`,
    method: "GET" as const,
  };
  const response = await fetcher(data);
  if (!response) throw new Error(response.message);
  return response;
};
export const fetchMedicamentoAplicado = async (idTratment: string) => {
  const data = {
    url: `${TREATMENT_PRODUCT}/${idTratment}`,
    method: "GET" as const,
  };
  const response = await fetcher(data);
  if (!response) throw new Error(response.message);
  return response;
};
