import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class AppServer {
  private app!: Express;
  private server!: http.Server;
  private io!: Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  >;

  constructor() {
    this.initServer();
    this.initSocket();
  }

  initServer() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
      },
    });
  }

  initSocket() {
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      socket.on("start-stream", ({ type, data }) => {
        console.log({ type, data });
        socket.broadcast.emit("start-stream", { type, data });
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado");
      });
    });
  }

  listen() {
    const port = process.env.PORT || 3000;
    this.server.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  }
}
