import NotificationSch from "../MODELS/notification.js"
import { User } from "../MODELS/User.js"
import {getFormattedDateTime as formatDateTime} from "../utils/getFormattedDateAndTime.js"

export async function websocketReq(req, res, next){
    try{
        const notifications = await NotificationSch.find({status: "pending"})
        const {formattedDate, formattedTime} = formatDateTime()
        const data = notifications.filter((v)=>{
            const time = v.intrisicTime?.split(":").splice(0,2).join(":")
            const readymsg = v.date === formattedDate && time === formattedTime
            return readymsg
        })
        data.map(async (v)=>{
            await NotificationSch.updateOne({_id: v._id},{$set:  {status: "unread"}}, {new: true, runValidators: true})
        })

        // console.log({data})
        res.status(200).json({
        status: "success",
        data
    })}catch(err){
        console.log(err.message)
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
        // next()
}
export async function userSpecificNotifications(req, res, next){
    const userId = req.query.userId
    if(!userId) throw new Error("No user-id found for the request")
            const checkUser = await User.findById(userId)
            if(!checkUser) throw new Error("This user cannot be found")
            try{
                const notifications = userId === checkUser.isAdmin ? await NotificationSch.find() : await NotificationSch.find({userId}).sort([[ "createdAt", -1 ]])

                res.status(200).json({
                status: "success",
                count: notifications.length,
                data: {notifications}
            })}catch(err){
                res.status(404).json({
                    status: "fail",
                    message: err.message
                })
            }
        
}
export async function createNotification(req, res, next){
    const userId = req.query.userId
    if(!userId) throw new Error("No user-id found in the request")
            const checkUser = await User.findById(userId)
            if(!checkUser) throw new Error("This user cannot be found")
            try{
                const notification = await NotificationSch.create(req.body)
        
                res.status(200).json({
                status: "success",
                count: notification.length,
                data: {notification}
            })}catch(err){
                res.status(404).json({
                    status: "fail",
                    message: err.message
                })
            }
        
}
export async function getNotification(req, res, next){
    const {userId, notificationId} = req.query
    try{
        const notification = await NotificationSch.findById({_id: notificationId})
        res.status(200).json({
            status: "success",
            data: {notification}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}
export async function updateNotification(req, res, next){
    const {userId, notificationId} = req.query
    console.log({req: req.body})

    try{
        const updatedNotification = await NotificationSch.updateOne({_id: notificationId},{$set:  req.body}, {new: true, runValidators: true})
        res.status(200).json({status: "success", data: {updatedNotification}})
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    // next()
}
export async function deleteAllNotifications(req, res, next) {
    const userId = req.query.userId
    const notificationId = req.query.notificationId
    if(!userId) throw new Error("No user-id found for the request")
    const checkUser = await User.findById(userId)

    try{
        const notifications = checkUser.isAdmin ? NotificationSch.find() : NotificationSch.find({userId: userId})
        notificationId ? await notifications.deleteMany({_id: notificationId}) : await notifications.deleteMany({})
        res.status(204).json({
            status: "success",
            data: null
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
        
    next()
} 