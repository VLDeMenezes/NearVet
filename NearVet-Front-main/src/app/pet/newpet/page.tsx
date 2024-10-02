"use client";
import ReusableForm from "@/components/Form/FormCustom";
import Screen from "@/components/Screen";
import { SexType, Species, Races } from "@/lib/Services/petService";
import { ErrorNotify } from "@/lib/toastyfy";
import { useEffect, useState } from "react";
import { InputsRegisterPet as originalInputsRegisterPet } from "@/components/Form/InputsForms";
import { FormNewPet } from "@/types/interfaces";
import { petController } from "@/lib/Controllers/petController";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";

const NewPetForm: React.FC = () => {
  const [formFields, setFormFields] = useState([...originalInputsRegisterPet]);
  const [especieSelect, setEspecieSelect] = useState("");
  const [especie, setEspecie] = useState<{ id: string; specie: string }[]>([]);
  const router = useRouter();
  const { user } = useUser();
  const { startLoading, stopLoading, loading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const speciesData = await Species(); // Obtener especies
        const sexData = await SexType(); // Obtener sexos
        setEspecie(speciesData);
        const updatedInputs = originalInputsRegisterPet.map((input) => {
          if (input.name === "specieId") {
            return { ...input, options: speciesData };
          }
          if (input.name === "sexId") {
            return { ...input, options: sexData };
          }
          return input;
        });
        setFormFields(updatedInputs);
      } catch (error: any) {
        ErrorNotify(`Error: ${error.message}`);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!especieSelect) return;
    const fetchRaces = async () => {
      try {
        const raceData = await Races(especieSelect); // Obtener razas
        const updatedInputs = formFields.map((input) => {
          if (input.name === "raceId") {
            return { ...input, options: raceData };
          }
          return input;
        });
        setFormFields(updatedInputs);
      } catch (error: any) {
        ErrorNotify(`Error: ${error.message}`);
      }
    };

    fetchRaces();
  }, [especieSelect]);
  const handleSpeciesChange = (value: string) => {
    especie &&
      especie.map((specie) => {
        if (specie.id === value) {
          setEspecieSelect(specie.specie);
        }
      });
  };
  const handleSubmit = async (values: FormNewPet) => {
    startLoading();
    const response = await petController(
      values,
      user?.id as string,
      user?.token as string
    );
    if (response) {
      router.push(PATHROUTES.PET);
      return response;
    }
    stopLoading();
  };

  return (
    <Screen>
      {loading && <Loading />}
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <ReusableForm
          formTitle="Registro de Mascota"
          inputs={formFields}
          onInputChange={handleSpeciesChange}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrar Mascota"
        />
      </div>
    </Screen>
  );
};

export default NewPetForm;
