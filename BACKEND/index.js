import express from 'express'
import cors from "cors"
import item_router from './ROUTES/itemsRouter.js'
import user_router from './ROUTES/usersRouter.js'
import cookieParser from 'cookie-parser'

export const app = express()
app.use(cors({
    origin: "https://iremember-eight.vercel.app", // Specify frontend origin
    credentials: true // Allow cookies and authentication headers
}))
app.use(express.json()) // to parse json data from the request body
app.use(express.urlencoded({extended: true})) // to parse urlencoded data from the request body
app.use(cookieParser()) // to parse cookies from the request headers


// ALL ROUTES BELOW
app.get("/", (req, res)=>{
    console.log("server serving")
    res.send("hello from the server")
})

// USERS ROUTE HANDLERS
app.use("/api/v1/users", user_router)
app.use("/api/v1/items", item_router)
