"use client";
import ReusableForm from "@/components/Form/FormCustom";
import { InputCupon } from "@/components/Form/InputsForms";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { fetcher } from "@/lib/fetcher";
import { SuccessNotify } from "@/lib/toastyfy";
import { useEffect } from "react";
const URL_CLIENTES = process.env.NEXT_PUBLIC_URL_CLIENTES;
const Page = () => {
  const { user } = useUser();

  useEffect(() => {
    const dataFetch = {
      url: `${URL_CLIENTES}`,
      method: "GET" as const,
    };
    const fetchClientes = async () => {
      const response = await fetcher(dataFetch);
      if (response) console.log(response);
    };
    fetchClientes();
  }, []);
  const handleSubmit = async (values: any) => {
    values = {
      ...values,
      valorPorc: Number(values.valorPorc),
      userId: user?.id!,
    };
    const dataCupon = {
      url: `/coupons`,
      method: "POST" as const,
      data: values,
    };
    const response = await fetcher(dataCupon);
    console.log(response);
    if (response.id) SuccessNotify("Cupon Creado");
  };
  return (
    <Screen>
      <ReusableForm
        formTitle="Crear nuevo cupon"
        inputs={InputCupon}
        onSubmit={handleSubmit}
        submitButtonLabel="Crear"
      />
    </Screen>
  );
};

export default Page;
