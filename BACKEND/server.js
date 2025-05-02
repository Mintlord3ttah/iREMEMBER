import dotenv from 'dotenv';
import { app } from "./index.js"
import mongoose from "mongoose"

dotenv.config({ path: "./config.env" });
const connect_str = process.env.DB_CONN_STR
// const options =  {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
mongoose.connect(connect_str) // (connect_str, options): options deprecated
.then((conn) => {
    console.log(conn)
    console.log("MongoDB connected")
}).catch((err) => {
    console.log(err)
})


// RUN THE SERVER
app.listen(3000, () => { // express server
    console.log('Server is running on port 3000')
})