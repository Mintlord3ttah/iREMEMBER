import { useState, useEffect } from "react"
import { useDataContext } from "../context/DataContext"
import { refreshAccessToken } from "../service/getUser"
import ProcessUI from "../UI/ProcessUI"
import toast from "react-hot-toast"

export default function Processing() {
  // const [isProcessing, setIsProcessing] = useState(false)
  const {getAccessToken} = useDataContext()
    
  useEffect(()=>{
     async function manageTokens(){
       const storedAcessToken = localStorage.getItem("accessToken")
      //  getcurrentUser(userId)
       if(storedAcessToken){
         // function checkTokenExpiration() {
             const { exp } = JSON.parse(atob(storedAcessToken.split(".")[1])); // Decode JWT expiry time
 
             if (Date.now() >= exp * 1000){
                 const res = await refreshAccessToken();
                 
                 if(res){
                    const newAcessToken = localStorage.getItem("accessToken")
                    getAccessToken(newAcessToken)
                    return window.location.href = "/app"
                 } 
             } 
             getAccessToken(storedAcessToken)
             window.location.href = "/app"
         // }
             // setInterval(checkTokenExpiration, 5 * 60 * 1000); // Check every 5 minutes
       }
       const res = await refreshAccessToken()
       if(res){
        window.location.href = "/app"
        getAccessToken(res)
       }  else {
         window.location.href = "/auth/login"
         toast("Please login to continue")
       }
     }
     manageTokens()
    },[])
   
   return <ProcessUI />
}
