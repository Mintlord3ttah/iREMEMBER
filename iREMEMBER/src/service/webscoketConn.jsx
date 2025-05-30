import { notifyUser } from "../utils/notifyUser";

export async function promiseWebSocketConn(){

        return new Promise((resolve, reject)=>{
            const ws = new WebSocket("ws://localhost:8080");

            // if(ws.current) return ws.current
            ws.onopen = () => {
            console.log("WebSocket connected");
            resolve(ws); // Resolve the promise with WebSocket instance
            };

            ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            reject(err); // Reject the promise if connection fails
            };
            ws.onmessage = async (event) => {
                const res = JSON.parse(event.data)
                const welcomeMsg = "Thank you for allowing notification. \niRemember can now update you concerning your stats info"
                notifyUser(res.msg || welcomeMsg, res.subject || "Alert")
            };
        })

    }