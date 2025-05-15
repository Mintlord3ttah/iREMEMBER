import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config({ path: "./config.env" });


export function generateUserTokens(user, res){
    const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
    const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,   // Prevent access from JavaScript
        secure: true,     // Enable for HTTPS only
        sameSite: "Strict" // Protect against CSRF
    });
    return {accessToken, refreshToken}
}