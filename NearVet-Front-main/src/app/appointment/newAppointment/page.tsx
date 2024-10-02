"use client";
import ReusableForm from "@/components/Form/FormCustom";
import Screen from "@/components/Screen";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { InputsRegisterAppoint } from "@/components/Form/InputsForms";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";
import { useAppointmentData } from "@/hooks/useLoadDataAppoint";
import { newAppointmentController } from "@/lib/Controllers/appointController";
import Image from "next/image";
import PaymentPage from "@/components/stripe";
import { fetcher } from "@/lib/fetcher";
import { ErrorNotify, SuccessNotify } from "@/lib/toastyfy";
import { useState } from "react";
import { setTime } from "@syncfusion/ej2-react-schedule";
const URL_API = process.env.NEXT_PUBLIC_API_URL;
const Appointments: React.FC = () => {
  const router = useRouter();
  const [descuento, setDescuento] = useState("price_1PxepLG7LObgRzJ9FJDUYGxW");
  const { user } = useUser();
  const { loading, startLoading, stopLoading } = useLoading();
  const {
    mascotas,
    mascotaSelect,
    categories,
    services,
    horarios,
    loading: dataLoading,
    serviceSelect,
    handleOnChange,
  } = useAppointmentData(user?.id as string, user?.token as string);

  const handleSubmit = async (values: any) => {
    startLoading();
    values = {
      ...values,
      price: serviceSelect?.price,
    };
    if (values.code) {
      const check = await checkCupon(values.code);
      if (check === false) {
        stopLoading();
        return;
      } else {
        const response = await newAppointmentController(values);
        startLoading();
        setTimeout(() => {
          handleCheckout("price_1Q0cCvG7LObgRzJ9yL3b490B");
        }, 2000);
        stopLoading();
      }
    } else {
      const response = await newAppointmentController(values);
      startLoading();
      setTimeout(() => {
        handleCheckout("price_1PxepLG7LObgRzJ9FJDUYGxW");
      }, 2000);
      stopLoading();
    }
  };

  if (loading || dataLoading) return <Loading />;
  const checkCupon = async (idCupon: string) => {
    const dataCupon = {
      url: `/coupons/code/${idCupon}`,
      method: "GET" as const,
    };
    const response = await fetcher(dataCupon);

    if (response.code) {
      SuccessNotify("Cupon correcto");
      const dataActualizarCupon = {
        url: `/coupons/${response.id}`,
        method: "PUT" as const,
        data: {
          id: response.id,
          code: response.code,
          valorPorc: Number(response.valorPorc),
          used: true,
          userId: response.userId,
        },
      };
      const actualizarCupon = await fetcher(dataActualizarCupon);

      return true;
    } else {
      ErrorNotify("El cupon no existe");
      return false;
    }
  };
  const handleCheckout = async (price: string) => {
    startLoading();
    const response = await fetch(
      `${URL_API}/payments/stripe/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: price,
        }),
      }
    );

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirige al usuario a la página de pago de Stripe
    }
  };
  const inputsWithOptions = InputsRegisterAppoint.map((input) => {
    if (input.name === "category") {
      return { ...input, options: categories };
    } else if (input.name === "petId") {
      return { ...input, options: mascotas };
    } else if (input.name === "serviceId") {
      return { ...input, options: services };
    } else if (input.name === "time") {
      return { ...input, options: horarios };
    }
    return input;
  });

  return (
    <Screen>
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto relative">
        <ReusableForm
          formTitle="Registro de Turno"
          inputs={inputsWithOptions}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrar Turno"
          onInputChange={(value) => handleOnChange(value)}
        />

        {mascotaSelect && (
          <Image
            src={mascotaSelect.imgProfile}
            alt="mascota"
            width={80}
            height={80}
            className="absolute top-[2vh] left-[2vw] size-[10vw] md:size-[10vw] opacity-90 rounded-full"
          />
        )}
        {serviceSelect && (
          <div className="dark:border rounded-md p-5 flex flex-col text-start gap-2 w-1/2 ">
            <h3 className="text-lg font-semibold text-center text-detail">
              Detalles del Servicio seleccionado
            </h3>
            <p>
              <strong>Tipo de servicio seleccionado: </strong>
              {serviceSelect.description}
            </p>
            <p>
              <strong>Precio del servicio seleccionado: </strong>$
              {serviceSelect.price}
            </p>
          </div>
        )}
      </div>
    </Screen>
  );
};

export default Appointments;
