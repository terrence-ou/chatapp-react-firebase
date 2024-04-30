import { useState, useEffect } from "react";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db } from "../firebase-config";

import Sidebar from "./Sidebar";

import { ChatRoomType } from "../types"; // chatRoom data datatype

const ChatRoomContainer = () => {
  const [chats, setChats] = useState<ChatRoomType[]>([]);

  const chatRoomRef = collection(db, "chatRooms");
  const currUID = localStorage.getItem("auth-uid");

  useEffect(() => {
    const queryMessages = query(
      chatRoomRef,
      where("participants", "array-contains", currUID)
    );

    const currentChats: ChatRoomType[] = [];
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      snapshot.forEach((doc) => {
        currentChats.push({ ...doc.data(), id: doc.id } as ChatRoomType);
      });
      setChats(currentChats);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Sidebar chats={chats} />
    </div>
  );
};

export default ChatRoomContainer;
