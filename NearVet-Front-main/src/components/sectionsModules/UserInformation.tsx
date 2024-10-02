"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import ReusableForm from "../Form/FormCustom";
import { InputsModifyUser as originalInputsModifyUser } from "../Form/InputsForms";
import Image from "next/image";
import { FormRegisterValues, User } from "@/types/interfaces";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
import { modifyUserService } from "@/lib/Services/userService";
import { Modal } from "../ModalImage";
import { IoPencil } from "react-icons/io5";
import { InfoNotify, PromessNotify } from "@/lib/toastyfy";

const UserInformation: React.FC = () => {
  const [formFields, setFormFields] = useState([...originalInputsModifyUser]);
  const { user, setUser } = useUser();
  const [modal, setModal] = useState<boolean>(false);
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (user) {
      startLoading();

      const updatedInputs = originalInputsModifyUser.map((input) => {
        return {
          ...input,
          initialValue: user[input.name as keyof User] || "",
        };
      });

      setFormFields(updatedInputs);
      setTimeout(() => stopLoading(), 2000);
    }
  }, [user]);

  const handleSubmit = async (values: FormRegisterValues) => {
    try {
      startLoading();
      const modifiedValues = Object.keys(values).reduce((acc, key) => {
        const initialValue = formFields.find(
          (field) => field.name === key
        )?.initialValue;

        if (values[key] !== initialValue) {
          acc[key] = values[key];
        }
        return acc;
      }, {} as Record<string, any>);

      if (modifiedValues.dni) {
        modifiedValues.dni = Number(modifiedValues.dni);
      }
      if (modifiedValues.phone) {
        modifiedValues.phone = Number(modifiedValues.phone);
      }
      if (Object.keys(modifiedValues).length === 0) {
        InfoNotify("No realizaste ningun cambio.");
        return;
      }

      const response = await PromessNotify(
        "Actualizando tus datos",
        "Actualizado exitosamente",
        modifyUserService(
          modifiedValues,
          user!.id as string,
          user!.token as string
        )
      );

      if (response.id) {
        InfoNotify("Hemos actualizado tus datos.");
        const updateUser = {
          ...user,
          ...response,
        };
        localStorage.setItem("user", JSON.stringify(updateUser));
        setTimeout(() => window.location.reload(), 2000);
      }
    } finally {
      stopLoading();
    }
  };

  const onCloseModal = () => {
    setModal(false);
  };
  return (
    <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto my-2">
      {loading && <Loading />}
      <Modal
        isOpen={modal}
        onClose={onCloseModal}
        id={user!.id as string}
        token={user!.token as string}
        type="profile"
      />
      <h3 className="text-2xl font-semibold dark:text-darkHline">Tus Datos</h3>
      <div className="flex flex-col md:flex-row gap-5 items-center relative p-2">
        <button
          className="font-semibold text-2xl absolute top-0 right-0"
          onClick={() => setModal(true)}
        >
          <IoPencil />
        </button>
        <Image
          src={user!.imgProfile}
          width={100}
          height={100}
          alt={`Foto de perfil de ${user!.name}`}
          className="rounded-full bg-detail p-1"
        />
        <div className="flex flex-col text-justify text-wrap">
          <p>
            <span className="font-bold">Nombre:</span> {user!.name}{" "}
            {user?.lastname}
          </p>
          <p>
            <span className="font-bold">Email:</span> {user!.email}
          </p>
          <p>
            <span className="font-bold">Teléfono de contacto:</span>{" "}
            {user?.phone}
          </p>
        </div>
      </div>
      <span className="text-gray-400 font-bold">_______________</span>
      {formFields && !loading && (
        <ReusableForm
          notLogo
          displayRow
          formTitle="Cambiar tus datos"
          inputs={formFields}
          onSubmit={handleSubmit}
          submitButtonLabel="Modificar"
        />
      )}
    </div>
  );
};

export default UserInformation;
