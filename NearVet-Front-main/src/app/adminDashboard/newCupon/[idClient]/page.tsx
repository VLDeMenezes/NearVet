"use client";
import ReusableForm from "@/components/Form/FormCustom";
import { InputCupon } from "@/components/Form/InputsForms";
import Screen from "@/components/Screen";
import PATHROUTES from "@/helpers/path-routes";

import { fetcher } from "@/lib/fetcher";
import { ErrorNotify, InfoNotify, SuccessNotify } from "@/lib/toastyfy";
import { useParams, useRouter } from "next/navigation";

const URL_CLIENTES = process.env.NEXT_PUBLIC_URL_CLIENTES;
const Page = () => {
  const idClient = useParams().idClient;
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    if (!idClient) {
      InfoNotify("No se encontro el cliente");
      return;
    }
    values = {
      ...values,
      valorPorc: Number(values.valorPorc),
      userId: idClient as string,
    };

    const dataCupon = {
      url: `/coupons`,
      method: "POST" as const,
      data: values,
    };
    const response = await fetcher(dataCupon);

    if (response.code) {
      SuccessNotify("Cupon Creado");
      router.push(PATHROUTES.ADMIN_DASHBOARD);
    } else {
      ErrorNotify(response.message);
    }
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
