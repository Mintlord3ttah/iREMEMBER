
import { User } from "../MODELS/User.js"
import { API } from "../utils/apiHandlers.js"
import { generateEmailToken } from "../utils/generateEmailToken.js"
import nodemailer from "nodemailer"
import { generateUserTokens } from "../utils/generateUserTokens.js";

let redirect;

// export async function tokenRotation(req, res, next){    
//     try{
//         const token = req.body.token
//         const user = await User.findOneAndUpdate({email: req.body.email}, { emailToken: token });
//         res.status(200).json({
//             status: "success",
//             data: {meassage: "please check your email for verification", id: user.id }
//         })
//     }catch(err){
//         res.status(404).json({
//             status: "fail",
//             message: err.message
//         })
//     }
//     next()
// }
export async function createUser(req, res, next){
    try{
        const api = new API(User, req)
        api.create()
        const user = await api.query
        // console.log()
        // const user = await User.create(req.body)
        // res.status(201).json({
        //     status: "success",
        //     data: {user}
        // })
    }catch(err){
         return res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}
export async function sendVerificationEmail(req, res, next){  
    console.log(req.body)
    redirect = req.body.redirect
    try{
    const token = generateToken()  
    const emailSender = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "iremember584@gmail.com",
            pass: "xtuu zmjh rrxx oebp"
        }
    })
    const verificationLink = `http://localhost:3000/api/v1/users/email/verify?token=${token}` // includes redirect
    const mailOptions = {
        from: "iremember584@gmail.com",
        to: req.body.email,
        subject: "Verify Your Email",
        text: `Click the link to verify your email: ${verificationLink}`
    };
        emailSender.sendMail(mailOptions)
        req.body.token = token

        // await User.findByIdAndUpdate(userId, { emailToken: token });
        // res.status(200).json({
        //     status: "success",
        // data: {message: "check your" +req.body.email +"for the verification link"}
    // })
    }catch(err){
        console.log(err.meassage)
       return res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}
export async function storeEmailToken(req, res, next){    
    try{
        const token = req.body.token
        const user = await User.findOneAndUpdate({email: req.body.email}, { emailToken: token });
        res.status(200).json({
            status: "success",
            data: {meassage: "please check your email for verification", id: user.id }
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}

export async function verifyEmail(req, res, next){  
    const token = req.query.token  

    try{
        if(!token) throw new Error("Invalid token")
        const user = await User.findOne({ emailToken: token }); 
        if(!user) throw new Error("No user found for this token")
        const {refreshToken, accessToken} = generateUserTokens(user, res)
        
        user.emailToken = ""
        user.emailVerified = true
        user.isAuthenticated = true
        // user.accessToken = accessToken
        // user.refreshToken = refreshToken
        await user.save()
        res.status(200).redirect(redirect)
        // .json({
        // status: "success",
        // data: {newUser}
        // })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}
export async function logoutUser(req, res, next){    
    try{
        const users = await User.findByIdAndUpdate(req.params, {isAuthenticated: false})
        res.status(200).json({
        status: "success",
        data: {message: "Logout successfull"}
    })}catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
    next()
}
export async function getUsers(req, res, next){    
    try{
        const users = await User.find(req.query)
        res.status(200).json({
        status: "success",
        data: {users}
    })}catch(err){
       return res.status(404).json({
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