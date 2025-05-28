import { server } from "../websocketApp.js";

// Executes when the connection is successfully established.
// socket.addEventListener('open', event => {
//   console.log('WebSocket connection established!');
//   // Sends a message to the WebSocket server.
//   socket.send('Hello Server!');
// });
// // Listen for messages and executes when a message is received from the server.
// socket.addEventListener('message', event => {
//   console.log('Message from server: ', event.data);
// });
// // Executes when the connection is closed, providing the close code and reason.
// socket.addEventListener('close', event => {
//   console.log('WebSocket connection closed:', event.code, event.reason);
// });
// // Executes if an error occurs during the WebSocket communication.
// socket.addEventListener('error', error => {
//   console.error('WebSocket error:', error);
// });

// server.on("connection", (ws) => {
//     console.log("User connected");
//     async function pendingNotifications() {
//         const res = await fetch("http://localhost:3000/api/v1/notifications?userId=websocket")
//         const data = await res.json()
//         return data
//     }

//     // Simulating a new notification push
//     setTimeout(async () => {
//         const {formattedDate, formattedTime} = getFormattedDateTime()
//         const pendingMsgs = await pendingNotifications()
//         pendingMsgs.forEach(message => {
//             const time = message.time.split(":").splice(0,2)
//             const readymsg = message.date === formattedDate && time === formattedTime ? message : null
//             console.log(readymsg.message)
//             ws.send(JSON.stringify({ message: readymsg.subject || readymsg.message }));
//         });
      
//     }, 2000);
//   });
  

// const getFormattedDateTime = () => {
//     const date = new Date();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//     const day = String(date.getDate()).padStart(2, "0");
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     return {formattedDate: `${day}/${month}/${year}`, formattedTime: `${hours}:${minutes}`};
//   };
  