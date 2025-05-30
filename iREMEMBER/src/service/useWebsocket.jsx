import { useEffect } from 'react';
import { promiseWebSocketConn } from './webscoketConn';

export default function useWebsocket(currentUser) {
  useEffect(() => {
        async function WebSocket() {
            const conn = promiseWebSocketConn({currentUser})
        }
        WebSocket()
    }, []);

  return null
}
