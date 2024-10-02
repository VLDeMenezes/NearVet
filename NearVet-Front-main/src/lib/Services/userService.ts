import { FormRegisterValues, FormValues } from "@/types/interfaces";
import { fetcher } from "../fetcher";

const SIGNIN_URL = process.env.NEXT_PUBLIC_SIGNIN_URL;
const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL;
const SIGN_GOOGLE = process.env.NEXT_PUBLIC_SIGN_GOOGLE;
const MODIFI_USER = process.env.NEXT_PUBLIC_MODIFI_USER;
const BILLS_USER = process.env.NEXT_PUBLIC_BILLS_USER;
const BILL_MODIFY = process.env.NEXT_PUBLIC_SALE_URL;
const BILL_END = process.env.NEXT_PUBLIC_SALE_END_URL;
const VETERINARIANS_URL = process.env.NEXT_PUBLIC_VETERINARIANS_URL;
const NEW_VETERINARIAN = process.env.NEXT_PUBLIC_NEW_VETERINARIAN;
const VET_MODIFY = process.env.NEXT_PUBLIC_VETS;
const NEW_USER_VETERINARIA = process.env.NEXT_PUBLIC_NEW_USER_VETERINARIA;

export const LoginService = async (userData: FormValues) => {
  const dataLogin = {
    url: SIGNIN_URL as string,
    method: "POST" as const,
    data: userData,
  };
  try {
    const responseLogin = await fetcher(dataLogin);
    if (!responseLogin.id) throw new Error(responseLogin.message);
    return responseLogin;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerService = async (values: FormRegisterValues) => {
  const dataRegister = {
    url: SIGNUP_URL as string,
    method: "POST" as const,
    data: values,
  };
  try {
    const responseRegister = await fetcher(dataRegister);
    if (!responseRegister.id) throw new Error(responseRegister.message);
    return responseRegister;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerGoogleService = async (values: FormRegisterValues) => {
  const dataRegister = {
    url: SIGN_GOOGLE as string,
    method: "POST" as const,
    data: values,
  };
  try {
    const responseRegister = await fetcher(dataRegister);
    if (!responseRegister.id) throw new Error(responseRegister.message);
    return responseRegister;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const modifyUserService = async (
  values: Partial<FormRegisterValues>,
  id: string,
  token: string
) => {
  const dataModify = {
    url: `${MODIFI_USER}/${id}`,
    method: "PUT" as const,
    data: values,
    token: token,
  };
  try {
    const responseModify = await fetcher(dataModify);
    if (!responseModify.id) throw new Error(responseModify.message);
    return responseModify;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const BillsService = async (
  page: number,
  id: string,
  startDay: string,
  endDay: string
) => {
  const dataBills = {
    url: `${BILLS_USER}${page}&limit=10&userId=${id}&start=${startDay}&end=${endDay}`,
    method: "GET" as const,
  };
  try {
    const responseBills = await fetcher(dataBills);
    if (!responseBills) throw new Error(responseBills.message);
    return responseBills;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const BillsGeneralService = async () => {
  const dataBills = {
    url: "/sales/SalesByClinical",
    method: "GET" as const,
  };
  try {
    const responseBills = await fetcher(dataBills);
    if (!responseBills) throw new Error(responseBills.message);
    return responseBills;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const VeterinariesServices = async () => {
  try {
    const responseVeterinaries = await fetcher({
      url: VETERINARIANS_URL as string,
      method: "GET" as const,
    });
    if (!responseVeterinaries) throw new Error(responseVeterinaries.message);
    return responseVeterinaries;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const BillEndService = async (billId: string) => {
  const dataBillEnd = {
    url: `${BILL_END}/${billId}`,
    method: "PUT" as const,
  };
  try {
    const responseBillEnd = await fetcher(dataBillEnd);
    if (!responseBillEnd) throw new Error(responseBillEnd.message);
    return responseBillEnd;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const BillModifyService = async (values: any, billId: string) => {
  const dataBillEnd = {
    url: `${BILL_MODIFY}/${billId}`,
    method: "PUT" as const,
    data: values,
  };
  try {
    const responseBillEnd = await fetcher(dataBillEnd);
    if (!responseBillEnd) throw new Error(responseBillEnd.message);
    return responseBillEnd;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const NewVetService = async (values: FormRegisterValues, token: string) => {
  try {
    const dataRegister = {
      url: NEW_USER_VETERINARIA as string,
      method: "POST" as const,
      data: values,
      token: token
    };
    const CreateUser = await fetcher(dataRegister);

    if (!CreateUser.id) throw new Error(CreateUser.message);
    const dataVet = {
      url: NEW_VETERINARIAN as string,
      method: "POST" as const,
      data: {
        licence: values.licence,
        specialty: values.specialty,
        description: values.description,
        userId: CreateUser.id,
      },
    };
    const responseVet = await fetcher(dataVet);
    if (!responseVet) throw new Error(responseVet.message);
    return responseVet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const ModifyVetService = async (
  values: any,
  idVet: string,
  token: string
) => {
  const dataModify = {
    url: `${VET_MODIFY}/${idVet}`,
    method: "PUT" as const,
    token: token,
    data: values,
  };
  try {
    const responseModifyVet = await fetcher(dataModify);

    if (!responseModifyVet) throw new Error(responseModifyVet.message);

    return responseModifyVet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
