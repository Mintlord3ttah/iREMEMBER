import express from "express"
import { authenticateToken, createItem, deleteAllItems, deleteItem, deleteItems, getAllItems, getItem, updateItem, updateItems } from "../CONTROLLERS/itemController.js"


// ITEM ROUTE HANDLERS
const item_router = express.Router()

item_router.use(authenticateToken)

item_router.route("/")
.get(getAllItems)
.post(createItem)

item_router.route("/:id")
.get(getItem)
.patch(updateItem)
.delete(deleteItem)

item_router.route("/uniform/:mutate")
.patch(updateItems)
.delete(deleteItems)

item_router.route("/db/wipe")
.delete(deleteAllItems)

export default item_router
