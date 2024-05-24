import io, { Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_IO_URL, {
      autoConnect: false,
    });
  }
  return socket;
};
