export function notifyUser(message, type="welcome"){
  // console.log({message})

      if (Notification.permission !== "granted") {
        if (!("Notification" in window)) return console.error("This browser does not support notifications.")
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log({message})
          const notify = new Notification(`iREMEMBER - ${type}!`, {
            body: message,
            icon: "https://example.com/icon.png",
            
          });
    
          console.log(notify)
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
    }