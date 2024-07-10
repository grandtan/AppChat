import express from "express";
import http from "http";
import { Server } from "socket.io";
import Redis from "ioredis";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const redis = new Redis({
  port: parseInt(process.env.SECRET_REDIS_PORT || "6379"),
  host: process.env.SECRET_REDIS_HOST || "localhost",
  password: process.env.SECRET_REDIS_PASSWORD || "",
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("loadUserData", async (username, callback) => {
    const userData = await redis.hgetall(`user:${username}`);
    const chatMessages = await redis.lrange(`chat:${username}`, 0, -1);
    callback(
      userData,
      chatMessages.map((msg) => JSON.parse(msg))
    );
  });

  socket.on("saveUserData", (username, profileIcon) => {
    redis.hmset(`user:${username}`, { profileIcon });
  });

  socket.on("message", (msg) => {
    redis.rpush(`chat:${msg.username}`, JSON.stringify(msg));
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
