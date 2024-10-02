"use client";

import Screen from "@/components/Screen";
import { FormValues } from "@/types/interfaces";
import { useUser } from "@/context/UserContext";
import GoogleButton from "@/components/GoogleButton";
import ReusableForm from "@/components/Form/FormCustom";
import { InputsLogin } from "@/components/Form/InputsForms";
import Link from "next/link";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InfoNotify } from "@/lib/toastyfy";

const SignIn: React.FC = () => {
  const { loginWithCredentials, user, session } = useUser();
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
  const handleSubmit = async (values: FormValues) => {
    startLoading();
    await loginWithCredentials(values);
    stopLoading();
  };

  return (
    <Screen>
      {loading && <Loading />}
      <div className="w-3/4 dark:bg-darkBackgroundFront dark:border-darkBorders md:w-2/3 lg:w-2/3 flex flex-col items-center justify-center border border-1 rounded-md p-5 my-10 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm">
        <ReusableForm
          formTitle="Iniciar Sesión"
          inputs={InputsLogin}
          onSubmit={handleSubmit}
          submitButtonLabel="Iniciar"
          className="dark:text-lightText"
        />
        <Link
          className="text-primary font-bold flex flex-row dark:text-lightText"
          href={PATHROUTES.REGISTER}
        >
          <h3 className="px-1 dark:text-secondary">¿Aún sin cuenta? </h3>
          <span className="dark:text-primary">Registrarte</span>
        </Link>
        <span className="text-gray-400 font-bold dark:text-darkText">
          - OR -
        </span>
        <GoogleButton />
      </div>
    </Screen>
  );
};

export default SignIn;
