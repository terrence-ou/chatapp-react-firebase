import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

/* Types */

interface ChatProps {
  room: string;
  handleSetRoom: (roomId: string | null) => void;
}

interface messageDataType {
  createdAt: Timestamp;
  id: string;
  room: string;
  text: string;
  user: string;
}

/* The body of the Chat component */
const Chat = ({ room, handleSetRoom }: ChatProps) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messageHist, setMessageHist] = useState<messageDataType[]>([]);
  const messageRef = collection(db, "messages");

  // controls the message from the input element
  const handleSetNewMessage = (currMessage: string) => {
    setNewMessage(currMessage);
  };

  // holds chat history
  const handleSetMessageHist = (messages: messageDataType[]) => {
    setMessageHist(messages);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room,
    });
    handleSetNewMessage("");
  };

  // convert milliseconds to hr-min-sec format. Should be located in a separate file
  const millsToTime = (date: Date) => {
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${hour}:${minute}:${second}`;
  };

  // Listen to the the changes from Firebase
  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messageStore: messageDataType[] = [];
      snapshot.forEach((doc) => {
        messageStore.push({ ...doc.data(), id: doc.id } as messageDataType);
      });
      messageStore.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds); // TODO: Comment out to see if sorting works
      handleSetMessageHist(messageStore);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div>
        <h3>Room: {room}</h3>
        {<button onClick={() => handleSetRoom(null)}>Leave Room</button>}
      </div>
      {/* Chat history */}
      <div>
        {messageHist.map((data) => {
          return (
            <p key={data.id}>
              <strong>{data.user}</strong>: {data.text}{" "}
              <em>{millsToTime(data.createdAt.toDate())}</em>
            </p>
          );
        })}
      </div>
      {/* New message input + button */}
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Type your message here"
          value={newMessage}
          onChange={(event) => handleSetNewMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
