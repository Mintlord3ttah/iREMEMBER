import express from "express"
import { createUser, 
        deleteUser, 
        getUser, 
        getUsers, 
        logoutUser, 
        sendVerificationEmail, 
        storeToken, 
        updateUser, 
        verifyEmail } from "../CONTROLLERS/userController.js"


// USERS ROUTE HANDLERS
const user_router = express.Router()

user_router.route("/")
.get(getUsers)
.post(createUser, sendVerificationEmail, storeToken)

user_router.route("/email/verify")
.get(verifyEmail)

user_router.route("/logout/:id")
.patch(logoutUser)

user_router.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

export default user_router
// // ITEM ROUTE HANDLERS
// user_router.route("/api/v1/items")
// .get(getUsers)
// .post(createUser)

// user_router.route("/api/v1/items/:id")
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser)