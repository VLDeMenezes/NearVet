"use client";
import Screen from "@/components/Screen";
import PATHROUTES from "@/helpers/path-routes";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { InputsModifyPet as originalInputsPet } from "@/components/Form/InputsForms";
import useLoading from "@/hooks/LoadingHook";
import { FormNewPet, Mascota } from "@/types/interfaces";
import Loading from "@/components/Loading";
import ReusableForm from "@/components/Form/FormCustom";
import { useUser } from "@/context/UserContext";
import {
  fetchPetIdController,
  modifyPetController,
} from "@/lib/Controllers/petController";
import { ErrorNotify } from "@/lib/toastyfy";

const ModifyPet: React.FC = () => {
  const [formFields, setFormFields] = useState([...originalInputsPet]);
  const { loading, startLoading, stopLoading } = useLoading();
  const { user } = useUser();
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const idUrl = useParams();
  const router = useRouter();

  useEffect(() => {
    if (idUrl.idPet === "undefined") {
      router.push(PATHROUTES.PET);
      return;
    }
    const fetchMascotas = async () => {
      try {
        const data = await fetchPetIdController(
          idUrl.idPet as string,
          user?.token as string
        );
        setMascota(data);
      } catch (error: any) {
        ErrorNotify(error.message);
      }
    };

    if (user?.token) {
      startLoading();
      fetchMascotas();
    }
  }, []);

  useEffect(() => {
    if (mascota) {
      const updatedInputs = originalInputsPet.map((input) => {
        return {
          ...input,
          initialValue: mascota[input.name as keyof Mascota] || "",
        };
      });
      setFormFields(updatedInputs);
      setTimeout(() => stopLoading(), 2000);
    }
  }, [mascota]);

  const handleSubmit = async (values: FormNewPet) => {
    try {
      startLoading();
      await modifyPetController(
        values,
        mascota?.id as string,
        user?.token as string
      );
    } finally {
      stopLoading();
      router.push(PATHROUTES.PET);
    }
  };

  return (
    <Screen>
      {loading && <Loading />}

      {formFields && !loading && (
        <ReusableForm
          notLogo
          displayRow
          formTitle="Cambiar datos de la mascota"
          inputs={formFields}
          onSubmit={handleSubmit}
          submitButtonLabel="Modificar"
        />
      )}
    </Screen>
  );
};

export default ModifyPet;
