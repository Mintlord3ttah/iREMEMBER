import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from './CONTROLLERS/userController.js'

export const app = express()
app.use(express.json()) // to parse json data from the request body
app.use(express.urlencoded({extended: true})) // to parse urlencoded data from the request body


// ALL ROUTES BELOW
app.get("/", (req, res)=>{
    console.log("server serving")
    res.send("hello from the server")
})

app.route("/api/v1/users")
.get(getUsers)
.post(createUser)

app.route("/api/v1/users/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser)