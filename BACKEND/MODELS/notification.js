import mongoose from "mongoose";


const tokenSchema = mongoose.Schema({
    
    userId: {
        type: String,
        required: [true, "UserId cannot be empty"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    subject: String,
    message: String,
    date: String,
    time: String,
    status: {
        type: String,
        enum: ["unread", "opened", "pending"],
        default: "unread"
    }
})

const NotificationSch = mongoose.model("notification", tokenSchema)
export default NotificationSch