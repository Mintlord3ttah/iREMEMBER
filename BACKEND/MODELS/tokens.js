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
})

const Token = mongoose.model("tokens", tokenSchema)
export default Token