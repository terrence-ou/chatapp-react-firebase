import { useEffect } from "react";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { useAppDispatch } from "../hooks/reduxHooks";
import { messageActions } from "../features/messageSlice";
import { db } from "../firebase/firebase-config";
import { getUserInfo } from "../firebase/utils";
import type { ChatRoomType, memberType } from "../types"; // chatRoom data datatype
import { LOCAL_UID } from "../consts";

import Sidebar from "./SideBar/Sidebar";
import MessageView from "./Messages/MessageView";

/* The body of the ChatRoomContainer component */
const ChatAppContainer = () => {
  const dispatch = useAppDispatch();

  const chatRoomRef = collection(db, "chatRooms");
  const currUID = localStorage.getItem(LOCAL_UID);

  // Listen to the server to get the message updates
  useEffect(() => {
    const queryMessages = query(
      chatRoomRef,
      where("participants", "array-contains", currUID)
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const currentChats: ChatRoomType[] = [];
      const memberUIDs = new Set<string>();
      snapshot.forEach((doc) => {
        currentChats.push({ ...doc.data(), id: doc.id } as ChatRoomType);
        doc.data().participants.forEach((uid: string) => memberUIDs.add(uid));
      });
      dispatch(messageActions.SET_CHATS(currentChats));

      memberUIDs.forEach(async (uid) => {
        const userData = await getUserInfo(uid);
        dispatch(messageActions.SET_MEMBER(userData as memberType));
      });
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
