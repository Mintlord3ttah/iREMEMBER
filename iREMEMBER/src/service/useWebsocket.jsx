import React from 'react'
import { useEffect } from 'react';
import { promiseWebSocketConn } from './webscoketConn';
import { notifyUser } from '../utils/notifyUser';
import { useState } from 'react';

export default function useWebsocket() {
  const [message, setMessage]= useState("Thank you for allowing notification. \niRemember can now update you concerning your stats info")
    useEffect(() => {
        async function WebSocket() {
          // console.log({message})
            const res = await promiseWebSocketConn({setMessage})
            notifyUser(message, "Alert")
        }
        WebSocket()
    }, [message]);
  return null
}
