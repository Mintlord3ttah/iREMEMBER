import { Item } from "../MODELS/Item.js"
import { API } from "../utils/apiHandlers.js"

export function parsBody(req, res, next){
    JSON.parse(req.body)

    next()
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
     try{
            const items = await Item.find(req.query)
            res.status(200).json({
            status: "success",
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
    try{
        const item = await Item.findById(req.params.id)
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
    try{
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.status(200).json({
            status: "success",
            data: {updatedItem}
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}
export async function deleteItem(req, res, next){
    try{
        const deletedUser = await Item.findByIdAndDelete(req.params.id)
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