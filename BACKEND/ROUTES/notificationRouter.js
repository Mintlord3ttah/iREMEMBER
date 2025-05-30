import express from "express"
import { createNotification, websocketReq, deleteAllNotifications, getNotification, updateNotification, userSpecificNotifications } from "../CONTROLLERS/notificationContr.js"

export const notification_router = express.Router()

notification_router.route("/websocket")
.patch(websocketReq)

notification_router.route("/")
.get(userSpecificNotifications)
.post(createNotification)

notification_router.route("/notification")
.get(getNotification)
.patch(updateNotification)
.delete(deleteAllNotifications)