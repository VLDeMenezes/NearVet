import React, { useEffect, useRef, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { modifyImagenController } from "@/lib/Controllers/petController";
import { ErrorNotify } from "@/lib/toastyfy";
import { useUser } from "@/context/UserContext";
import { ModalProps } from "@/types/interfaces";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  id,
  onClose,
  token,
  type,
}) => {
  const [File, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const { setUser, user } = useUser();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFile(null);
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];

    if (!droppedFile) return;

    const allowedFormats = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    if (!allowedFormats.includes(droppedFile.type)) {
      ErrorNotify(
        "Formato de archivo no permitido. Solo se permiten JPG, PNG, y WebP."
      );
      setFile(null);
      return;
    }

    if (droppedFile.size > 200 * 1024) {
      // 200 KB en bytes
      ErrorNotify("El archivo es demasiado grande. El tamaño máximo es 200KB.");
      setFile(null);
      return;
    }

    setFile(droppedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleSubmit = async () => {
    if (!File) return;
    const formData = new FormData();
    formData.append("file", File);

    try {
      const responseImagen = await modifyImagenController(
        id,
        token,
        formData,
        type
      );
      if (responseImagen && responseImagen.id && responseImagen.imgProfile) {
        setUser({ ...user!, imgProfile: responseImagen.imgProfile });
      }
    } finally {
      setFile(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="input-description"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={(e) => {
        // Evitar que el clic en el fondo del modal dispare el explorador de archivos
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm min-w-96 mx-auto">
        <h2 id="modal-title" className="text-lg font-semibold mb-2">
          Cargar Imagen
        </h2>
        <div className="">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            id="input-description"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <div
            className={`mb-4 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              dragging ? "border-blue-600 bg-blue-100" : "border-gray-300"
            }`}
            onClick={() => inputRef.current?.click()} // Esto abre el explorador de archivos
          >
            {File ? (
              <p className="text-center text-green-600">{File.name}</p>
            ) : (
              <p className="text-center text-gray-500">
                Arrastra y suelta una imagen aquí o haz clic para seleccionarla
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ButtonCustom text="Cargar" onClick={handleSubmit} />

          <button
            onClick={() => {
              setFile(null);
              onClose();
            }}
            className="px-5 py-2 m-auto rounded-lg bg-red-600 text-white hover:bg-red-700 text-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
