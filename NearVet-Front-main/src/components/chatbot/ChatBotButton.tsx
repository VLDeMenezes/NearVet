"use client";
import { useState } from "react";
import { IoChatbox } from "react-icons/io5";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleChatbot}
        className="p-3 rounded-full bg-detail text-white hover:bg-violet-900 focus:outline-none shadow-lg"
      >
        {/* Puedes reemplazar este emoji por un ícono de chat */}
        <IoChatbox />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-end z-50"
          onClick={handleOutsideClick}
        >
          <div className="fixed bottom-16 right-5 bg-white p-4 rounded-lg shadow-lg w-[35vw] h-[80vh] ">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/spNkPAMNc-lLewwvc3u42"
              width="100%"
              className="size-full relative"
            ></iframe>
            <button
              onClick={toggleChatbot}
              className="text-gray-500 absolute top-2 right-2 "
            >
              ✖️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;
