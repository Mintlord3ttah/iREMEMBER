
import { User } from "../MODELS/User.js"

export async function getUsers(req, res, next){    
    try{
        const users = await User.find(req.query)
        res.status(200).json({
        status: "success",
        data: {users}
    })}catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}
export async function createUser(req, res, next){
    console.log(req.body)
    try{
        const user = await User.create(req.body)
        res.status(201).json({
            status: "success",
            data: {user}
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}
export async function getUser(req, res, next){
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {user}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}
export async function updateUser(req, res, next){
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.status(200).json({
            status: "success",
            data: {updatedUser}
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}
export async function deleteUser(req, res, next){
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
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