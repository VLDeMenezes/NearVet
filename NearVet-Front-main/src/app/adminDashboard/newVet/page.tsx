"use client";
import ReusableForm from "@/components/Form/FormCustom";
import { InputsNewVet } from "@/components/Form/InputsForms";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import { newVet } from "@/lib/Controllers/userController";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { startLoading, stopLoading, loading } = useLoading();
  const { user } = useUser();
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    if (!user?.token) {
      return;
    }
    startLoading();
    const response = await newVet(values, user?.token as string);
    if (response.id) {
      router.push(PATHROUTES.ADMIN_DASHBOARD);
    }
    stopLoading();
  };
  return (
    <Screen>
      {loading && <Loading />}
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <ReusableForm
          formTitle="Registrar nuevo veterinario"
          inputs={InputsNewVet}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrar"
        />
      </div>
    </Screen>
  );
};

export default Page;
