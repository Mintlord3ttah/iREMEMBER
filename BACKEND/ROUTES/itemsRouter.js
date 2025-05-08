import express from "express"
import { createItem, deleteItem, getAllItems, getItem, updateItem } from "../CONTROLLERS/itemController.js"


// ITEM ROUTE HANDLERS
const item_router = express.Router()

item_router.route("/")
.get(getAllItems)
.post(createItem)

item_router.route("/:id")
.get(getItem)
.patch(updateItem)
.delete(deleteItem)
export default item_router