interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setTurno: () => void;
  idPet: string;
  idUser: string;
  finish: () => void;
}
import React, { useReducer, useEffect, useState } from "react";
import ReusableForm from "./Form/FormCustom";
import {
  InputsAppointsVetClinical,
  InputsAppointsVetPendientes,
  InputsAppointsVetPrescipciones,
  InputsAppointsVetTratamiento,
  InputsFilesAppoints,
} from "./Form/InputsForms";
import {
  ExaminationController,
  NewFilesController,
  NewPendingController,
  NewPrescriptionController,
  NewTratmentsController,
} from "@/lib/Controllers/appointController";
import { consulta, InfoNotify } from "@/lib/toastyfy";
import { useServices } from "@/hooks/useServices";
import {
  ClinicalExamination,
  Pendiente,
  Prescripcion,
  Tratamiento,
} from "@/types/interfaces";
import Image from "next/image";

// Estados iniciales para el reducer
const initialState = {
  selectedSection: "Examinacion clinica",
  examinationDone: false,
  services: [],
  products: [],
};

// Reducer para gestionar los estados del modal
const modalReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_SECTION":
      return { ...state, selectedSection: action.payload };
    case "SET_EXAMINATION_DONE":
      return { ...state, examinationDone: action.payload };
    case "SET_SERVICES":
      return { ...state, services: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const ModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  setTurno,
  idPet,
  idUser,
  finish,
}) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { services, products, loading, error } = useServices();
  const [examenPracticado, setExamenPracticado] =
    useState<ClinicalExamination>();
  const [tratamiento, setTratamiento] = useState<Tratamiento[]>([]);
  const [prescripciones, setPrescripciones] = useState<Prescripcion[]>([]);
  const [pendientes, setPendientes] = useState<Pendiente>();
  const [File, setFile] = useState<
    {
      image: string;
      id: string;
      clinicalExaminationId: string;
    }[]
  >([]);

  useEffect(() => {
    if (services.length > 0) {
      dispatch({ type: "SET_SERVICES", payload: services });
    }
    if (products.length > 0) {
      dispatch({ type: "SET_PRODUCTS", payload: products });
    }
  }, [services, products]);
  if (!isOpen) return null;
  const handleOnClose = () =>
    consulta("Se perderán los cambios, ¿Desea continuar?", onClose);
  const handleOnEndTurn = () => {
    consulta("Se cerrará el turno, ¿Desea continuar?", () => {
      finish();
      onClose();
    });
  };

  const NewInputsTratments = InputsAppointsVetTratamiento.map((input) => {
    if (input.name === "serviceId") {
      return { ...input, options: state.services };
    } else if (input.name === "productId") {
      return { ...input, options: state.products };
    }
    return input;
  });
  const NewInputsPrescriptions = InputsAppointsVetPrescipciones.map((input) => {
    if (input.name === "productId") {
      return { ...input, options: state.products };
    }
    return input;
  });
  const NewInputsPendings = InputsAppointsVetPendientes.map((input) => {
    if (input.name === "serviceId") {
      return { ...input, options: state.services };
    }
    return input;
  });

  const handleSubmitExamination = async (values: any) => {
    const formattedValues = {
      ...values,
      fc: Number(values.fc),
      fr: Number(values.fr),
      tllc: Number(values.tllc),
      temperature: Number(values.temperature),
      hydration: Number(values.hydration),
      petId: idPet,
      veterinarianId: idUser,
      date: new Date(),
    };
    const response = await ExaminationController(formattedValues);
    if (response) {
      setExamenPracticado(response);
      dispatch({ type: "SET_EXAMINATION_DONE", payload: true });
      localStorage.setItem("examination", response.id);
    }
  };
  const handleSubmitTratment = async (values: any) => {
    const treatmentValues = (({
      serviceId,
      description,
      observation,
      productId,
    }) => ({
      serviceId,
      description,
      observation,
      productId,
      clinicalExaminationId: localStorage.getItem("examination"),
      date: new Date(),
      price: 10000,
    }))(values);

    const response = await NewTratmentsController(treatmentValues);
    if (response) {
      setTratamiento((prevTrat) => [...prevTrat, response]);
    }
  };

  const handleSubmitPresciption = async (values: any) => {
    const prescriptionValues = (({ productId, description }) => ({
      productId,
      description,
      clinicalExaminationId: localStorage.getItem("examination"),
    }))(values);
    const response = await NewPrescriptionController(prescriptionValues);

    if (response) {
      setPrescripciones((prevPres) => [...prevPres, response]);
    }
  };
  const handleSubmitPending = async (values: any) => {
    if (pendientes) {
      InfoNotify("Ya tiene un pendiente pendiente");
      return;
    }
    const PendingsValues = (({ date, serviceId, description }) => ({
      date,
      serviceId,
      userId: idUser,
      petId: idPet,
      description,
      notification: true,
      endPending: date,
    }))(values);
    const response = await NewPendingController(PendingsValues);

    if (response) {
      setPendientes(response);
    }
  };
  const handleSubmitFiles = async (values: any) => {
    const FilesValues = (({ file }) => ({
      file,
    }))(values);

    let formData = new FormData();
    formData.append("file", FilesValues.file);

    const response = await NewFilesController(
      examenPracticado?.id as string,
      formData
    );

    if (response) {
      setFile((prevFiles) => [...prevFiles, response]);
    }
  };

  const renderSectionContent = () => {
    if (loading) return <p>Cargando servicios...</p>;
    if (error) return <p>Error al cargar servicios: {error}</p>;

    switch (state.selectedSection) {
      case "Examinacion clinica":
        return (
          <>
            {examenPracticado && (
              <div className="w-2/3 shadow-lg rounded-lg flex flex-col my-2 p-2">
                <h3 className="text-center text-detail text-lg">
                  Examen registrado:
                </h3>

                <div className="flex flex-row justify-around">
                  <p>FC: {examenPracticado.fc}</p>
                  <p>FR: {examenPracticado.fr}</p>
                </div>
                <div className="flex flex-row justify-around">
                  <p>Hidratacion: {examenPracticado.hydration}</p>
                  <p>Temperatura: {examenPracticado.temperature}</p>
                </div>
                <div className="flex flex-row justify-around">
                  <p>TLLC: {examenPracticado.tllc}</p>
                  <p>Mocosidad: {examenPracticado.mucous}</p>
                </div>
                <div className="flex flex-row justify-around">
                  <p>Estado de Animo: {examenPracticado.moodState}</p>
                  <p>Temperamento: {examenPracticado.temper}</p>
                </div>
                <div className="flex flex-row justify-around">
                  <p>Ammnesis: {examenPracticado.anamnesis}</p>
                  <p>Diagnostico: {examenPracticado.diagnosis}</p>
                </div>
              </div>
            )}
            {examenPracticado ? null : (
              <ReusableForm
                formTitle="Examinación clínica"
                inputs={InputsAppointsVetClinical}
                onSubmit={handleSubmitExamination}
                displayRow
                notLogo
                submitButtonLabel="Guardar"
              />
            )}
          </>
        );
      case "Tratamiento":
        return state.examinationDone ? (
          <>
            <ReusableForm
              formTitle="Nuevo Tratamiento"
              inputs={NewInputsTratments}
              onSubmit={handleSubmitTratment}
              displayRow
              notLogo
              submitButtonLabel="Guardar"
            />
            {tratamiento && (
              <div className="flex flex-row flex-wrap m-auto gap-1 w-full md:w-3/4">
                {tratamiento.map((tratamiento) => (
                  <div className="w-1/3 shadow-lg rounded-lg flex flex-col p-2 m-auto ">
                    <h3 className="text-detail text-lg text-center">
                      Tratamiento
                    </h3>
                    <div className="m-auto flex flex-col gap-2 my-2">
                      <p>
                        <strong>Descripcion:</strong> {tratamiento.description}
                      </p>
                      <p>
                        {" "}
                        <strong>Precio:</strong> {tratamiento.price}
                      </p>
                    </div>
                    <div className="m-auto flex flex-row gap-2 my-2 items-center text-center">
                      {tratamiento.observation && (
                        <p>Observacion: {tratamiento.observation}</p>
                      )}
                      {tratamiento.service && (
                        <p>
                          <strong>Servicio:</strong>
                          {tratamiento.service.service}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Primero debes realizar la examinación clínica</p>
        );
      case "Prescripciones":
        return state.examinationDone ? (
          <>
            <ReusableForm
              formTitle="Nueva Prescripcion"
              inputs={NewInputsPrescriptions}
              onSubmit={handleSubmitPresciption}
              notLogo
              submitButtonLabel="Guardar"
            />
            {prescripciones && (
              <div className="flex flex-row flex-wrap m-auto gap-1 w-full md:w-3/4">
                {prescripciones.map((prescripcion) => (
                  <div className="w-1/3 shadow-lg rounded-lg flex flex-col p-2 m-auto">
                    <h3 className="text-detail text-lg text-center">
                      {prescripcion.product.name}
                    </h3>
                    <small className="text-center">
                      {prescripcion.product.description}
                    </small>
                    <div className="m-auto flex flex-col gap-2 my-2 text-center">
                      <p>Descripcion: </p>
                      <p>{prescripcion.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Primero debes realizar la examinacion clinica</p>
        );
      case "Pendientes":
        return (
          <>
            <ReusableForm
              formTitle="Nuevo Pendiente"
              inputs={NewInputsPendings}
              onSubmit={handleSubmitPending}
              displayRow
              notLogo
              submitButtonLabel="Guardar"
            />
          </>
        );
      case "Archivos":
        return state.examinationDone ? (
          <>
            <ReusableForm
              formTitle="Archivos del turno"
              inputs={InputsFilesAppoints}
              onSubmit={handleSubmitFiles}
              notLogo
              submitButtonLabel="Cargar Archivos"
            />
            {File.length > 0 && (
              <div className="flex flex-wrap items-center justify-center">
                {File.map((Fil) => (
                  <div className="shadow-lg rounded-lg mx-2 p-2">
                    {Fil.image === undefined ? null : (
                      <>
                        <Image
                          src={Fil.image}
                          width={100}
                          height={100}
                          alt={`Imagen del archivo ${Fil.id}`}
                          className="rounded-lg"
                          onError={() => {
                            Fil.image = "/logoNear.png";
                          }}
                        />
                        <p className="text-center">
                          Archivo:
                          {Fil.image.split(".").pop()}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Primero debes realizar la examinacion clinica</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-20 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 flex flex-col min-w-[80vw] max-w-[80vw] min-h-[90vh] max-h-[90vh]">
        <nav className="grid grid-flow-row md:grid-flow-col text-center">
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Examinacion clinica"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Examinacion clinica" })
            }
          >
            Examinación
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Tratamiento"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Tratamiento" })
            }
          >
            Tratamiento
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Prescripciones"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Prescripciones" })
            }
          >
            Prescripciones
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Archivos"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Archivos" })
            }
          >
            Archivos
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Pendientes"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Pendientes" })
            }
          >
            Pendientes
          </button>
        </nav>
        <article className="flex flex-col items-center mt-4 overflow-y-scroll relative">
          {renderSectionContent()}
        </article>
        <div className="absolute bottom-[8%] right-[13%] flex flex-row gap-2">
          <button
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
            onClick={handleOnClose}
          >
            Cerrar Registro
          </button>
          <button
            className="bg-detail text-white p-2 rounded-lg hover:bg-green-600"
            onClick={handleOnEndTurn}
          >
            Finalizar Turno
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
