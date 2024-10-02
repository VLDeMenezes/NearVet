interface InputFieldProps {
  input: any;
  formik: any;
  onInputChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  input,
  formik,
  onInputChange,
}) => {
  const commonClasses = `"w-full md:w-2/3 lg:w-1/2" bg-transparent border-[.2em] border-1 placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-white p-1 rounded-md text-center text-darkBorders ${
    formik.touched[input.name] && formik.errors[input.name]
      ? "border-red-500"
      : "border-gray-300"
  }`;

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    formik.setFieldValue(input.name, event.target.value);
    onInputChange?.(event.target.value);
  };

  switch (input.type) {
    case "select":
      return (
        <select
          id={input.name}
          name={input.name}
          value={formik.values[input.name]}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          className={commonClasses}
        >
          <option label="Seleccione una opción" />
          {input.options?.map((option: any) => (
            <option key={option.id} value={option.id}>
              {option?.[input.labelKey ?? "defaultLabel"]}
            </option>
          ))}
        </select>
      );
    case "textarea":
      return (
        <textarea
          id={input.name}
          name={input.name}
          value={formik.values[input.name]}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          className={commonClasses}
          rows={3}
        />
      );
    case "file":
      return (
        <input
          id={input.name}
          name={input.name}
          type="file"
          onChange={(event) =>
            formik.setFieldValue("file", event.currentTarget.files![0])
          }
          onBlur={formik.handleBlur}
          className={commonClasses}
        />
      );
    default:
      return (
        <input
          id={input.name}
          name={input.name}
          type={input.type}
          value={formik.values[input.name]}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          placeholder={input.placeholder || ""}
          disabled={input.disable}
          className={commonClasses}
        />
      );
  }
};

export default InputField;
