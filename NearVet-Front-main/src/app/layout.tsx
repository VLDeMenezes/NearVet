import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./Providers";
import { UserProvider } from "@/context/UserContext";
import ChatbotButton from "@/components/chatbot/ChatBotButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NearVet",
  description: "A Place to find your Vet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <Providers>
            <UserProvider>
              <NavBar />
              {children}
              <ChatbotButton />
              <Footer />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                draggable
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
                limit={2}
              />
            </UserProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
