import { Flip, toast } from "react-toastify";

export const SuccessNotify = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
    draggable: true,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: false,
  });
};
export const ErrorNotify = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
    draggable: true,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: false,
  });
};

export const PromessNotify = (
  messagePending: string = "Procesando...",
  messageSuccess: string = "Petición exitosa",
  promise: Promise<any>
) => {
  return toast.promise(promise, {
    pending: `${messagePending}`,
    success: `${messageSuccess}`,
  });
};

export const InfoNotify = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    draggable: true,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: false,
    hideProgressBar: false,
  });
};

export const consulta = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  toast.info(
    ({ closeToast }) => (
      <div>
        <p className="text-center">{message}</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-detail text-white p-2 rounded-lg hover:bg-green-600"
            onClick={() => {
              onConfirm(); // Llamar a la función de confirmación
              closeToast(); // Cerrar el toast
            }}
          >
            Aceptar
          </button>
          <button
            className="bg-red-500 text-white  p-2 rounded-lg hover:bg-red-600"
            onClick={() => {
              if (onCancel) onCancel(); // Llamar a la función de cancelación si existe
              closeToast(); // Cerrar el toast
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      theme: "light",
      closeOnClick: false,
      transition: Flip,
    }
  );
};
