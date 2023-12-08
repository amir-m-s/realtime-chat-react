import { useState, useEffect } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

// Generate ID for data
import { ID, Query } from "appwrite";

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

    setMessages([
      ...messages,
      {
        $id: response.$id,
        $createdAt: response.$createdAt,
        body: response.body,
      },
    ]);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.limit(45)]
    );

    setMessages(response.documents);
  };

  const deleteMessages = async messageId => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, messageId);
    setMessages(prevState =>
      messages.filter(message => message.$id !== messageId)
    );
  };

  return (
    <main className="container main-container">
      <div className="messages">
        {messages.map(message => (
          <div key={message.$id} className="message-container">
            <div className="message-header">
              <div className="message-created-at">{message.$createdAt}</div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => deleteMessages(message.$id)}
                >
                  &times;
                </button>
              </div>
            </div>
            <div>{message.body}</div>
          </div>
        ))}
      </div>
      <form id="send-message" onSubmit={handleSubmit}>
        <textarea
          autoFocus
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
