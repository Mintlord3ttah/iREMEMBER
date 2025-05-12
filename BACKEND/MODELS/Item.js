import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    item: {
        type: String,
        unique: [true, "Item already exist"],
        required: [true, "Item name cannot be empty"]
    },
    packed: {
        type: Boolean,
        default: false
    },
    favourite: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
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
    createdById: {
        type: String,
        required: [true, "Please provide the createdById"]
    },
    selected: {
        type: Boolean,
        default: false
    },
    __v: {
        type: Number,
        select: false
    }
})

export const Item = mongoose.model("items", itemSchema)
