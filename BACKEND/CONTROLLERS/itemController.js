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
                data: {updatedItems}
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
        if (!/^(expriority,exfavourite|expriority|exfavourite)$/.test(param)) throw new Error("Invalid request")
            param.includes("expriority") ? await Item.deleteMany({ priority: { $nin: ["mid-high", "high"] } }) :
            param.includes("exfavourite") ? await Item.deleteMany({ favourite: { $ne: true } }) :
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
        await Item.deleteMany({})
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