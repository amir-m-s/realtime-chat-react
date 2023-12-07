import { useState, useEffect } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

const Room = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    );

    console.log(response);
    setMessages(response.documents);
  };
  return (
    <main className="container main-container">
      {messages.map(message => (
        <div key={message.$id} className="message-container">
          <div className="message-created-at">{message.$createdAt}</div>
          <div>{message.body}</div>
        </div>
      ))}
    </main>
  );
};

export default Room;
