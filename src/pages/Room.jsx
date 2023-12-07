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
    <>
      {messages.map(message => (
        <div key={message.$id}>
          <div>{message.$createdAt}</div>
          <div>{message.body}</div>
        </div>
      ))}
    </>
  );
};

export default Room;
