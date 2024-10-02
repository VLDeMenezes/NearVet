"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Screen from "@/components/Screen";
import ReusableForm from "@/components/Form/FormCustom";
import { InputsRegisterUser } from "@/components/Form/InputsForms";
import { FormRegisterValues } from "@/types/interfaces";
import PATHROUTES from "@/helpers/path-routes";
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { InfoNotify } from "@/lib/toastyfy";

const RegisterForm: React.FC = () => {
  const { registerWithCredentials, user } = useUser();
  const { startLoading, stopLoading, loading } = useLoading();
  const router = useRouter();
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setTimePassed(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);
  useEffect(() => {
    if (user && timePassed) {
      if (user.role.role === "user") router.push(PATHROUTES.USER_DASHBOARD);
      if (user.role.role === "adminVet")
        router.push(PATHROUTES.ADMIN_DASHBOARD);
      if (user.role.role === "veterinarian")
        router.push(PATHROUTES.VET_DASHBOARD);
    }
  }, [user, timePassed]);
  const handleSubmit = async (values: FormRegisterValues) => {
    startLoading();
    registerWithCredentials(values);
    stopLoading();
  };
  return (
    <Screen>
      {loading && <Loading />}
      <div className="dark:bg-darkBackgroundFront dark:border-darkBorders md:w-2/3 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <ReusableForm
          formTitle="Registrarse"
          inputs={InputsRegisterUser}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrarse"
        />
        <Link
          className="text-primary font-bold flex flex-row"
          href={PATHROUTES.LOGIN}
        >
          <h3 className="px-1 dark:text-darkHline">¿Ya tienes cuenta? </h3>
          Iniciar sesión
        </Link>
        <span className="text-gray-400 font-bold">- OR -</span>
        <GoogleButton />
      </div>
    </Screen>
  );
};

export default RegisterForm;
