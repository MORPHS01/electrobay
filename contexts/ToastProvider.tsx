"use client"
import { ToastContainer, Bounce } from "react-toastify";
import { useTheme } from "next-themes";

function ToastProvider() {
  const { theme } = useTheme()

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === "light" ? "light" : "dark"}
      transition={Bounce}
    />
  )
}

export default ToastProvider