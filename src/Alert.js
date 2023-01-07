import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from "./context";

const Alert = () => {
  const { alert, showAlert } = useGlobalContext();
  useEffect(() => {
    if (alert.show) {
      toast[alert.type](alert.msg, {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      showAlert(false, "", "");
    }
  }
    , [alert, showAlert]);

  return (
    <ToastContainer />
  );
};

export default Alert;