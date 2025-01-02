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





// import { useEffect, useRef } from 'react';

// const useWebSocket = (url, onMessage) => {
//   const ws = useRef(null);

//   useEffect(() => {
//     if (!url) {
//       console.error('WebSocket URL is invalid:', url);
//       return;
//     }

//     ws.current = new WebSocket(url);
//     console.log('WebSocket instance created:', ws.current);

//     ws.current.onopen = () => console.log(`Connected to ${url}`);
//     ws.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log('WebSocket message received:', data);

//         if (onMessage) {
//           onMessage({ data, wsInstance: ws.current });
//         }
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error, event.data);
//       }
//     };

//     ws.current.onclose = () => console.log(`Disconnected from ${url}`);
//     ws.current.onerror = (error) => console.error('WebSocket error:', error);

//     return () => {
//       console.log('Closing WebSocket connection');
//       if (ws.current) {
//         ws.current.close();
//         ws.current = null;
//       }
//     };
//   }, [url, onMessage]);

//   return ws.current;
// };

// export default useWebSocket;