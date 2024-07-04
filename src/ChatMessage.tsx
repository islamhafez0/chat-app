import { Message } from "./types";
import { auth } from "./firebaseConfig";

const ChatMessage = ({ msg }: { msg: Message }) => {
  const { uid, photoURL, text } = msg;
  const messageClass = uid === auth.currentUser?.uid ? "sent" : "recived";
  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
      <img src={photoURL} alt="Profile" />
    </div>
  );
};

export default ChatMessage;
