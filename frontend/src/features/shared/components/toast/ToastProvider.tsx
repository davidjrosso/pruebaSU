"use client"

import { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import { Alert } from "@mui/material";

const ToastContext = createContext<any>({});

type Props = {
  children: React.ReactNode;
};

type ToastProvider = {
  open: boolean;
  onClose: () => void;
  message: "";
  severity: "success" | "warning" | "info" | "error";
  duration?: number;
  vertical?: string;
  horizontal?: string;
};

export const ToastProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  
  const toastShow = ({message,severity}:{message: string, severity: "error" | "warning" | "info" | "success"}) => {

    console.log(message)
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const value = {
    toastShow,
  };

  const closeToast = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ toastShow }}>
      <>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={closeToast}>
        <Alert onClose={closeToast} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      </>
    
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
