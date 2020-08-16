import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const options = {
  position: toast.POSITION.TOP_RIGHT, //"top-right"
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

info = (text) => {
  toast.info(text, options);
};

success = (text) => {
  toast.success(text, options);
};

warn = (text) => {
  toast.warn(text, options);
};

error = (text) => {
  toast.error(text, options);
};

const customToast = {
  info,
  success,
  warn,
  error
};

export default customToast;
