import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });


export async function generateUserTokens(user, res){
    const expTime = Math.floor(Date.now() / 1000); // 15 minutes
    const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expTime + 900}) // 15 minutes
    const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: expTime + 604800}) // 7 days

    if(!refreshToken) throw new Error("Failed to generate refresh token")
    await res.cookie("refreshToken", refreshToken, {
        httpOnly: true,   // Prevent access from JavaScript
        secure: true,     // Enable for HTTPS only
        sameSite: "Strict" // Protect against CSRF
    });
    console.log({refreshToken})
    return {accessToken, refreshToken}
}