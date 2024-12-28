// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { SEND_MESSAGE } from "../../graphql/subscriptions";

// const SendMessage = ({ roomId }) => {
//   const [content, setContent] = useState("");
//   const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage({
//       variables: { roomId, content },
//     });
//     setContent("");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Type your message..."
//           disabled={loading}
//           className="border p-2 rounded w-full"
//         />
//         <button
//           type="submit"
//           disabled={loading || !content.trim()}
//           className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//         >
//           {loading ? "Sending..." : "Send"}
//         </button>
//       </form>
//       {error && <p className="text-red-500">Error: {error.message}</p>}
//     </div>
//   );
// };

// export default SendMessage;