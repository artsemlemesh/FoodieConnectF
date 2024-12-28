// import React, { useEffect } from "react";
// import { useSubscription } from "@apollo/client";
// import { MESSAGE_ADDED } from "../../graphql/subscriptions";

// const SubscribeMessages = ({ roomId, onNewMessage }) => {
//   const { data, loading, error } = useSubscription(MESSAGE_ADDED, {
//     variables: { roomId },
//   });

//   useEffect(() => {
//     if (data && data.messageAdded) {
//       onNewMessage(data.messageAdded);
//     }
//   }, [data, onNewMessage]);

//   if (loading) return <p>Waiting for new messages...</p>;
//   if (error) return <p>Error with subscription: {error.message}</p>;

//   return null; // Subscription component doesn't render anything.
// };

// export default SubscribeMessages;