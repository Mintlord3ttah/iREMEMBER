import { Item } from "../MODELS/Item.js"
import { User } from "../MODELS/User.js"
import { API } from "../utils/apiHandlers.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });


export function parsBody(req, res, next){
    JSON.parse(req.body)

    next()
}
export async function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token", token, err });
        }

        const userFound = User.findOne({accessToken: token})
        req.user = userFound; // Attach user data to request
        next(); // Proceed to the next middleware or route
    });
}
export async function createItem(req, res, next){
    try{
        const api = new API(Item, req)
        api.create()
        const item = await api.query
        // console.log()
        // const item = await Item.create(req.body)
        res.status(201).json({
            status: "success",
            data: {item}
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}

export async function getAllItems(req, res, next) {
    const userId = req.query.userId
    if(!userId) return res.status(400).json({status: "fail", message: "No userId provided"})
    const sortField = req.query.sortField || "createdAt"
    const sortOrder = req.query.sortOrder || "asc"

    const checkUser = await User.findById(userId)
    console.log({checkUser, isAdmin: checkUser.isAdmin})
    try{
        const items = checkUser.isAdmin ? await Item.find() : sortField ? await Item.find({createdById: userId}).sort([[ sortField, sortOrder ]]) : await Item.find({createdById: userId})

        console.log({items})
        res.status(200).json({
        status: "success",
        count: items.length,
        data: {items}
    })}catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}

export async function getItem(req, res, next){
    //http://localhost:3000/api/v1/items/item?userId=1&itemId=1
    const {userId, itemId} = req.query
    try{
        const item = await Item.findById(itemId)
        res.status(200).json({
            status: "success",
            data: {item}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}
export async function updateItem(req, res, next){
    const {userId, itemId} = req.query
    console.log({req: req.body})

    try{
        const updatedItem = await Item.updateOne({_id: itemId},{$set:  req.body}, {new: true, runValidators: true})
        const items = await Item.find({_id: "6828658d06d76808b41218c2"})
            console.log({items, updatedItem})
        res.status(200)
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    // next()
}
export async function deleteItem(req, res, next){
    const {userId, itemId} = req.query

    try{
        const deletedUser = await Item.findByIdAndDelete(itemId)
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

export async function updateItems(req, res, next){
        const param = req.params.mutate
        try{
            if (!/^[-]?(packed|favourite)$/.test(param)) throw new Error("Invalid request")
            const findSelected = await Item.find({selected: true}) // check if there are seleted items
            const query = findSelected.length ? Item.find({selected: true}) : Item.find()
            const values = param.includes("-") 
            const updatedItems = param.includes("packed") ? await query.updateMany({ packed:  !values}) :
                                 await query.find().updateMany({ favourite: !values });
                                 await Item.find({selected: true}).updateMany({selected: false})
            
            
            res.status(200).json({
            status: "success",
            // data: {updatedItems}
            })
        }catch(err){
            res.status(400).json({
                status: "fail",
                message: err.message
            })
        }
    
        next()

}

export async function deleteItems(req, res, next) {
    const param = req.params.mutate
    try{
        if (!/^(expriority,exfavourite|expriority|exfavourite|expacked)$/.test(param)) throw new Error("Invalid request")
        if (!/^(expriority,exfavourite|expriority|exfavourite|expacked)$/.test(param)) throw new Error("Invalid request")
            param.includes("expriority") ? await Item.deleteMany({ priority: { $nin: ["mid-high", "high"] } }) :
            param.includes("expacked") ? await Item.deleteMany({ packed: { $ne: true } }) :
            await Item.deleteMany({favourite: { $ne: true }, priority: { $nin: ["mid-high", "high"]}})
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

export async function deleteAllItems(req, res, next) {
    try{
        // if(req.params !== "wipe") throw new Error("Invalid operation")
        const findSelected = await Item.find({selected: true}) // check if there are seleted items

        findSelected.length ? await Item.deleteMany({selected: true}) : await Item.deleteMany({})
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