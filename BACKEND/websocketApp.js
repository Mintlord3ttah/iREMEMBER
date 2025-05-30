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
          const res = await fetch("http://localhost:3000/api/v1/notifications/websocket", {
            method: "PATCH",
            body: null
          })
          
          if(!res.ok) return {error: "something went wrong"}
          const data = await res.json()
          return data
      } 
      // Simulating a new notification push
      setInterval(async () => {
          const pendingMsgs = await pendingNotifications()
          if(pendingMsgs?.error) return
          pendingMsgs.data.forEach(message => {
            console.log({message})
              ws.send(JSON.stringify({msg: message.message, subject: message.subject, id: message._id}));
          });
        
      }, 3000);
    });

  ws.on("message", (message) => {
    console.log("Received:", message);
    ws.send(JSON.stringify({message: "hey mint you are doing well"}));
  });

  ws.on("close", () => console.log("Client disconnected"));
});
