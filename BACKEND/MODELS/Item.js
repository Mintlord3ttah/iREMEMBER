import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    item: {
        type: String,
        required: [true, "Item name cannot be empty"]
    },
    purpose: String,
    count: {
        type: Number,
        default: 1,
    },
    priority:  {
        type: String,
        default: "normal",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdById: {
        type: String,
        required: [true, "Please provide the createdById"]
    },
    packed: {
        default: false,
        type: Boolean
    }
    // createdByEmail: {
    //     type: String,
    //     // required: [true, "please provide the createdByEmail"]
    // }
})

export const Item = mongoose.model("item", itemSchema)
