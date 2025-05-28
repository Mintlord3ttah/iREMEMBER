// const express = require("express");
// const WebSocket = require("ws");
import {WebSocketServer} from "ws";
import express from "express"
import http from "http"

const app = express();
export const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  server.on("connection", () => {
      console.log("User connected");
      async function pendingNotifications() {
          const res = await fetch("https://irem-backend.onrender.com/api/v1/notifications?userId=websocket")
          const data = await res.json()
          return data
      } 
      // Simulating a new notification push
      setInterval(async () => {
          const {formattedDate, formattedTime} = getFormattedDateTime()
          const pendingMsgs = await pendingNotifications()
          pendingMsgs.data.notifications.forEach(message => {
              const time = message.time.split(":").splice(0,2).join(":")
              const readymsg = message.date === formattedDate && time === formattedTime ? message : {subject: ""}
              if(!readymsg.subject) return
              console.log({readymsg})
              ws.send(JSON.stringify({ message: readymsg.subject || readymsg.message }));
          });
        
      }, 2000);
    });

  ws.on("message", (message) => {
    console.log("Received:", message);
    ws.send(JSON.stringify({message: "hey mint you are doing well"}));
  });

  ws.on("close", () => console.log("Client disconnected"));
});

const getFormattedDateTime = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return {formattedDate: `${day}/${month}/${year}`, formattedTime: `${hours}:${minutes}`};
};