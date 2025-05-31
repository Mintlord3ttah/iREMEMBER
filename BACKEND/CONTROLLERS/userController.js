
import { User } from "../MODELS/User.js"
import { API } from "../utils/apiHandlers.js"
import { generateEmailToken } from "../utils/generateEmailToken.js"
import nodemailer from "nodemailer"
import { generateUserTokens } from "../utils/generateUserTokens.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import NotificationSch from "../MODELS/notification.js";
import fs from "fs"

dotenv.config({ path: "./config.env" });
let redirect;

export async function tokenRotation(req, res) {
    const refreshToken = req.cookies.refreshToken
    console.log({refreshToken})
    if (!refreshToken) return res.status(401).send("No refresh token provided.");

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).send("Invalid refresh token.");

        const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const updatedUser = await User.findOneAndUpdate({ refreshToken: refreshToken }, {$set: {accessToken: newAccessToken}}, {new: true});
        // if (!updatedUser) return res.status(404).send("User not found.");
        res.json({ accessToken: newAccessToken, user: updatedUser });

    });
}
export async function validateLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({status: "fail", message: "Email and password are required."});

    const getUser = User.findOne({ email });
    if (!getUser) return res.status(404).json({status: "fail", message: "User not found."})
    // RETRIEVE PASSWORD
    const user = await getUser.select('+password').exec();
    console.log({password: user?.password, user})
    if (!user || user?.password !== password) return res.status(401).json({status: "fail", message: "Invalid email or password."});
    if (!user.emailVerified) return res.status(403).json({message: "Email not verified."});
    const { refreshToken, accessToken } = await generateUserTokens(user, res);
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    const LoggedInUser = await user.save();
    res.status(200).json({
        status: "success",
        data: { user: LoggedInUser, message: "Login successful" }
    });
}
export async function createUser(req, res, next){
    const ADMIN_DEV = process.env.ADMIN_DEV_PASSKEY
    const ADMIN_EMAIL = process.env.ADMIN_DEV_EMAIL
    if(req.body.email === ADMIN_EMAIL && req.body.password === ADMIN_DEV) {
        await User.findOneAndDelete({ email: req.body.email });
    } 
    try{
        const api = new API(User, req)
        api.create()
        const user = await api.query
    }catch(err){
         return res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

    next()
}
export async function sendVerificationEmail(req, res, next){  
    redirect = req.body.redirect
    try{
    const token = generateEmailToken()  
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

    }catch(err){
        // console.log(err.meassage)
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
            data: {message: "please check your email for verification", id: user._id }
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
        const getUser = User.findOne({ emailToken: token }); 
        if(!getUser) throw new Error("No user found for this token")
        const {refreshToken, accessToken} = await generateUserTokens(getUser, res)
        const user = await getUser.select('+password').exec();
        const welcomeMsg = JSON.parse(fs.readFileSync('../BACKEND/utils/welcomeMessage.json', 'utf8'))
        await NotificationSch.create({...welcomeMsg, userId: user._id })
        user.emailToken = ""
        user.emailVerified = true
        user.isAuthenticated = true
        user.accessToken = accessToken
        user.refreshToken = refreshToken
        user.isAdmin = user.email === process.env.ADMIN_DEV_EMAIL && user.password === process.env.ADMIN_DEV_PASSKEY ? true : false
        await user.save()
        
        res.status(200).redirect(redirect)
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
export async function getUserByToken(req, res, next){
    try{
        const user = await User.findOne({accessToken: req.query.token})
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