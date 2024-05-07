import { useEffect } from "react";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { useAppDispatch } from "../hooks/reduxHooks";
import { messageActions } from "../features/messageSlice";
import type { ChatRoomType } from "../types"; // chatRoom data datatype
import { db } from "../firebase-config";

import Sidebar from "./SideBar/Sidebar";
import MessageView from "./Messages/MessageView";

/* The body of the ChatRoomContainer component */
const ChatAppContainer = () => {
  const dispatch = useAppDispatch();

  const chatRoomRef = collection(db, "chatRooms");
  const currUID = localStorage.getItem("auth-uid");

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
      dispatch(messageActions.SET_CHATS(currentChats));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chatroom">
      <Sidebar />
      <MessageView />
    </div>
  );
};

export default ChatAppContainer;
