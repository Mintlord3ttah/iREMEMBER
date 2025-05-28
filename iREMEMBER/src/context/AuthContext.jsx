import { createContext } from "react";
import { useDataContext } from "./DataContext";
import { getUser, refreshAccessToken } from "../service/getUser";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const AuthContext  = createContext()
let timerId = null

function RefreshTokensProvider(){
  const [loading, setLoading] = useState(false)
    const {getAccessToken, 
        getCurrentUser, 
        getSigningType, 
        signingType, 
        } = useDataContext()

        async function rotateAccessToken(){
            const accessToken = localStorage.getItem("accessToken")
            if(!accessToken) await refreshAccessToken();
            const { exp } = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT expiry time
            if (Date.now() >= exp * 1000){
              const res = await refreshAccessToken();
              if(res){
                const newAcessToken = localStorage.getItem("accessToken")
                getAccessToken(newAcessToken)
                return
              } 
            }
          }

    useEffect(()=>{
        async function user() {
          setLoading(true)
          if(signingType === "login"){
           getSigningType("")
           setLoading(false)
          } 
          try{
              rotateAccessToken()
              const newToken = localStorage.getItem("accessToken")
              getAccessToken(newToken)
              const currUser = await getUser(`user?token=${newToken}`)
              getCurrentUser(currUser)
              setLoading(false)
          }catch(error){
            console.log(error.message)
            setLoading(false)
          }
        }
        user()
    },[signingType])
    
      useEffect(()=>{
        async function rotateTokens(){
          const storedAcessToken = localStorage.getItem("accessToken")
          if(storedAcessToken){
            rotateAccessToken() 
            getAccessToken(storedAcessToken)
            return
          }
          const res = await refreshAccessToken()
          if(!res) return window.location.href = "/Auth/Signup"
          const storedAccessToken = localStorage.getItem("accessToken")
          getAccessToken(storedAccessToken)
        }
        clearInterval(timerId)
        timerId = setInterval(async () => {
          // console.log("Token rotation started")
          const res = await rotateTokens()
          if(res){
            const newAcessToken = localStorage.getItem("accessToken")
            getAccessToken(newAcessToken)
            return
          }
        },  60 * 1000); // Check every 1 minute
      },[timerId])
      
   return <AuthContext.Provider value={{loading}} >
        <Outlet />
    </AuthContext.Provider>
}

function useAuthContext(){
    const context = useDataContext();
    if(!context) throw new Error("useAuthContext must be used within a AuthContextProvider")
    return context;
}

export { RefreshTokensProvider, useAuthContext };