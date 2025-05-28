import toast from "react-hot-toast";

export function promiseWebSocketConn({setMessage}){
        return new Promise((resolve, reject)=>{
            const ws = new WebSocket("ws://localhost:8080");

            ws.onopen = () => {
            console.log("WebSocket connected");
            resolve(ws); // Resolve the promise with WebSocket instance
            };

            ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            reject(err); // Reject the promise if connection fails
            };
            ws.onmessage = (event) => {
                const res = JSON.parse(event.data)
                // toast.success(res.message)
                // new Notification("iREMEMBER Alert", { body: message });
                
                setMessage(event.data);
            };
        })
    }