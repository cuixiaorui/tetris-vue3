import io from "socket.io-client";

export let socket;
export function initSocket() {
  socket = io("http://localhost:3001", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("连接成功");
  });
}
