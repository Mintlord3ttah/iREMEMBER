import dotenv from 'dotenv';
import { app } from "./index.js"
import mongoose from "mongoose"
import { server } from './websocketApp.js';

dotenv.config({ path: "./config.env" });
const connect_str = process.env.DB_CONN_STR
// const options =  {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
mongoose.connect(connect_str) // (connect_str, options): options deprecated
.then((conn) => {
    // console.log(conn)
    console.log("MongoDB connected")
}).catch((err) => {
    console.log(err)
})


// RUN THE SERVER
app.listen(3000, () => { // express server
    console.log('Server is running on port 3000')
})

///////////////////////////////////////////////////////////////////////////////////

server.listen(8080, () => console.log("WebSocket server running on port 8080"));


///////////////////////////////////////////////////////////////////////////////////

// // Creates a new WebSocket connection to the specified URL.
// const socket = new WebSocket('ws://localhost:8080');
// // Executes when the connection is successfully established.
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