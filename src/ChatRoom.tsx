import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { auth, firestore } from "./firebaseConfig";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Message } from "./types";

const ChatRoom = () => {
  const [messageValue, setMessageValue] = useState("");
  const dummyRef = useRef<HTMLDivElement>(null);

  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(30));
  const [messages] = useCollectionData<any>(q, { idField: "id" } as any);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { photoURL, uid } = auth.currentUser || { photoURL: "", uid: "" };
    const messageData = {
      text: messageValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    };
    await addDoc(collection(firestore, "messages"), messageData);
    setMessageValue("");
  };

  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-room">
      {messages?.length === 0 && (
        <p className="custom-message">Start messaging now!</p>
      )}
      <div className="messages-container">
        {messages
          ?.slice()
          .reverse()
          ?.map((message: Message, index) => (
            <ChatMessage key={`inx-${index}-${message.uid}`} msg={message} />
          ))}
        <div ref={dummyRef}></div>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageValue}
          onChange={handleChange}
          placeholder="Message"
        />
        <button
          disabled={messageValue === "" || !messageValue.trim()}
          type="submit"
          aria-label="Send Message"
        >
          <img src="/assets/send-icon.svg" alt="send" />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
