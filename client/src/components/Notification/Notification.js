import React from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NOTIFY_ROOT = document.getElementById('notify_root');

export default function Notification() {
  return createPortal(<ToastContainer autoClose={4000} newestOnTop={true} position="bottom-right" />, NOTIFY_ROOT)
}