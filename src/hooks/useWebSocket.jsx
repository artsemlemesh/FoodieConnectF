import { useEffect, useRef } from 'react';

const useWebSocket = (url, onMessage) => {
  const ws = useRef(null);

  
  

  useEffect(() => {
    if (!url) return; // Prevent connection if URL is not provided

    ws.current = new WebSocket(url);

    ws.current.onopen = () => console.log(`Connected to ${url}`);
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (onMessage) onMessage(data);
    };
    ws.current.onclose = () => console.log(`Disconnected from ${url}`);
    ws.current.onerror = (error) => console.error('WebSocket error:', error);

    return () => {
      if(ws.current){
      ws.current.close()
    }
  }
  }, [url]);
};

export default useWebSocket;