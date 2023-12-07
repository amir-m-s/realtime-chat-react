import { useState, useEffect } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

// Generate ID for data
import { ID } from "appwrite";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    console.log("Created: ", response);
    setMessageBody("");
  };

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
      <form id="send-message" onSubmit={handleSubmit}>
        <textarea
          className="message-textarea"
          required
          maxLength={1000}
          placeholder="Your Message..."
          rows="1"
          onChange={e => setMessageBody(e.target.value)}
          value={messageBody}
        ></textarea>
        <input type="submit" value="Send" className="btn btn-accent" />
      </form>
    </main>
  );
};

export default Room;
