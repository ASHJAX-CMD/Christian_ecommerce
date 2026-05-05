import { io } from "socket.io-client";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const socket = io(VITE_BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"],
  withCredentials: true,
  auth: {
    token: localStorage.getItem("token"),
  },
});
