import { useState, useEffect } from "react"
import { useDataContext } from "../context/DataContext"
import { refreshAccessToken } from "../service/getUser"

export default function Processing() {
  const [isProcessing, setIsProcessing] = useState(false)
  const {getAccessToken} = useDataContext()
    
  useEffect(()=>{
     async function manageTokens(){
       setIsProcessing(true)
       const storedAcessToken = localStorage.getItem("accessToken")
       console.log({storedAcessToken})
       if(storedAcessToken){
         // function checkTokenExpiration() {
             const { exp } = JSON.parse(atob(storedAcessToken.split(".")[1])); // Decode JWT expiry time
 
             if (Date.now() >= exp * 1000){
                 const res = await refreshAccessToken();
                 
                 if(res){
                    const newAcessToken = localStorage.getItem("accessToken")
                    getAccessToken(newAcessToken)
                    setIsProcessing(false)
                    return
                 } 
             } 
             getAccessToken(storedAcessToken)
             window.location.href = "/app"
         // }
             // setInterval(checkTokenExpiration, 5 * 60 * 1000); // Check every 5 minutes
       }
       const res = await refreshAccessToken()
       setIsProcessing(!res)
     }
     manageTokens()
    },[])
   
   return <div className="flex flex-col gap-4 justify-center items-center h-screen">
     <p>Please Wait while we process your data</p>
     <div className='gen-loader mt-12'></div>
     <p className="text-2xl font-bold">Loading...</p>
   </div>
}
