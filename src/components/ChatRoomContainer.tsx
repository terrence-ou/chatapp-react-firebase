import { useState, useEffect } from "react";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db } from "../firebase-config";

import Sidebar from "./Sidebar";

import { ChatRoomType } from "../types"; // chatRoom data datatype
import ChatMsgs from "./ChatMsgs";

/* The body of the ChatRoomContainer component */
const ChatRoomContainer = () => {
  // complete list of chat rooms related to the current user
  const [chats, setChats] = useState<ChatRoomType[]>([]);
  // the current room id controls the display of the display messages
  const [currRoomID, setCurrRoomID] = useState<string | null>(null);

  const chatRoomRef = collection(db, "chatRooms");
  const currUID = localStorage.getItem("auth-uid");

  const handleSetCurrRoomID = (id: string) => {
    setCurrRoomID(id);
  };
  const handleSetChats = (newChats: ChatRoomType[]) => {
    setChats(newChats);
  };

  // Listen to the server to get the message updates
  useEffect(() => {
    const queryMessages = query(
      chatRoomRef,
      where("participants", "array-contains", currUID)
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const currentChats: ChatRoomType[] = [];
      snapshot.forEach((doc) => {
        currentChats.push({ ...doc.data(), id: doc.id } as ChatRoomType);
      });
      handleSetChats(currentChats);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar chats={chats} handleSetCurrRoomID={handleSetCurrRoomID} />
      <ChatMsgs chats={chats} currRoomID={currRoomID} />
    </div>
  );
};

export default ChatRoomContainer;
