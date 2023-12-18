import { useState, useEffect } from "react";
import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

// import useful tools to work with database more easily
import { ID, Query } from "appwrite";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();

    // Subscribe to Messages event in order to get realtime responses!
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      response => {
        // If a message gets created at database, Update messages in realtime
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          // setMessages(prevState => [...prevState, response.payload]);
          // Use getMessages instead of setting messages again to prevent rendering twice and causing errors
          getMessages();
        }

        // If a message gets deleted in database; then update messages in realtime
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages(prevState =>
            prevState.filter(message => message.$id !== response.payload.$id)
          );
        }
      }
    );
    return () => {
      // Unsubscribe after updating messages to prevent rendering problems and other bugs
      unsubscribe();
    };
  }, []);

  // Submit function
  const handleSubmit = async e => {
    e.preventDefault();

    // Payload that we'll send to server
    let payload = {
      body: messageBody,
    };

    // Create a document in database
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    // Add messages to messages array
    setMessages(prevState => [
      ...prevState,
      {
        $id: response.$id,
        $createdAt: response.$createdAt,
        body: response.body,
      },
    ]);
    // Reset message input value
    setMessageBody("");
  };

  // Get messages from database
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      // Set limit for loaded messages to prevent too much memory usage
      [Query.limit(45), Query.orderDesc("$createdAt")]
    );

    // Reset messages array from messages saved in database
    setMessages(response.documents);
  };

  // Delete message from database
  const deleteMessages = async messageId => {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      messageId
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
            <div className="message-body">{message.body}</div>
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
