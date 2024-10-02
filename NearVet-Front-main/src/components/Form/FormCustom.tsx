import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReusableFormProps } from "@/types/interfaces";
import Image from "next/image";
import useLoading from "@/hooks/LoadingHook";
import InputField from "./InputField";

const ReusableForm: React.FC<ReusableFormProps> = ({
  notLogo = false,
  displayRow = false,
  formTitle,
  inputs,
  onSubmit,
  onInputChange,
  submitButtonLabel,
}) => {
  const initialValues = inputs.reduce((acc, input) => {
    acc[input.name] = input.initialValue || "";
    return acc;
  }, {} as Record<string, any>);
  const { loading } = useLoading();
  const [logoPag, setLogoPag] = useState<string>("");
  const LOGO_URL = process.env.NEXT_PUBLIC_LOGO;

  const validationSchema = Yup.object().shape(
    inputs.reduce((acc, input) => {
      if (input.validation) {
        acc[input.name] = input.validation;
      }
      return acc;
    }, {} as Record<string, Yup.AnySchema>)
  );
  useEffect(() => {
    const fetchLogo = async () => {
      const storedLogo = localStorage.getItem("logo");
      if (storedLogo) {
        setLogoPag(storedLogo);
      } else {
        const logo = await fetch(LOGO_URL as string);
        const logoText = await logo.text();
        setLogoPag(logoText);
        localStorage.setItem("logo", logoText);
      }
    };
    fetchLogo();
  }, []);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="dark:bg-darkBG w-full flex flex-col items-center justify-center p-5 gap-5 text-sm mx-auto">
      {notLogo ? null : (
        <div className="text-detail w-full sm:text-xl md:text-4xl flex gap-2 justify-center items-center">
          <Image
            src={logoPag}
            alt="Logo Nearvet"
            width={64}
            height={64}
            onError={() => setLogoPag("/logoNear.png")}
          />{" "}
          NearVet
        </div>
      )}
      <h2 className="sm:text-xl md:text-3xl text-lightHline dark:text-darkHline">
        {formTitle}
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className={`w-full flex flex-col items-center text-[1em]`}
      >
        <div
          className={`${
            displayRow
              ? "flex flex-row flex-wrap gap-1 justify-center items-center mx-auto"
              : "w-full md:w-2/3 "
          }`}
        >
          {inputs.map((input) => (
            <div
              className={` ${
                displayRow
                  ? "w-full md:w-2/3 lg:w-2/5 p-2 flex flex-col items-center "
                  : "w-full p-2 flex flex-col items-center"
              }`}
              key={input.name}
            >
              <label
                htmlFor={input.name}
                className="block text-sm font-semibold text-detail m-1"
              >
                {input.label}
              </label>

              <InputField
                input={input}
                formik={formik}
                onInputChange={onInputChange}
              />

              <div className="h-4 ">
                {formik.touched[input.name] && formik.errors[input.name] && (
                  <div className=" text-center bg-white">
                    <p className=" text-xs text-red-600">
                      {formik.errors[input.name]?.toString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`bg-detail px-5 py-2 my-3 mx-auto rounded-lg text-lg text-white hover:scale-105 ${
            formik.isSubmitting || loading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={formik.isSubmitting || loading}
        >
          {submitButtonLabel}
        </button>
      </form>
    </div>
  );
};

export default ReusableForm;
