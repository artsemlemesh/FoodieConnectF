// import React, { useEffect, useState } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_MESSAGES } from "../../graphql/subscriptions";

// const FetchMessages = ({ roomId }) => {
//   const { data, loading, error } = useQuery(GET_MESSAGES, {
//     variables: { roomId },
//   });

//   if (loading) return <p>Loading messages...</p>;
//   if (error) return <p>Error fetching messages: {error.message}</p>;

//   return (
//     <div>
//       <h3>Messages</h3>
//       <ul>
//         {data.messages.map((message) => (
//           <li key={message.id}>
//             <strong>{message.user.username}:</strong> {message.content}{" "}
//             <small>({new Date(message.timestamp).toLocaleTimeString()})</small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FetchMessages;