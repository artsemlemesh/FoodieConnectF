import { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const OnlineUsers = ({ url = '/cart/online-users' }) => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  //POLLING TO WEBSOCKETS
  //instead of polling integrate websockets later, for now polling is used
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axiosClient.get(url);
        // console.log('Online users:', response.data.online_users);
        setOnlineUsers(response.data.online_users);

      } catch (error) {
        console.error('Error fetching online users:', error);

      }
    };
    fetchOnlineUsers();

    //polling to keep the data updated
    const intervalId = setInterval(fetchOnlineUsers, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, [url]);


  return (
    <div>
      <h2>Online Users: {onlineUsers}</h2>
    </div>
  );
};


export default OnlineUsers;