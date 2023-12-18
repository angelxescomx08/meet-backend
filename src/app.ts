// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conenctado");

  socket.on("start-stream", ({ type, data }) => {
    console.log({ type, data });
    socket.broadcast.emit("start-stream", { type, data });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
