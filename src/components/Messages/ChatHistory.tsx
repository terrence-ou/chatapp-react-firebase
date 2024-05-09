import { useAppSelector } from "../../hooks/reduxHooks";
import type { RootState } from "../../store";

import Message from "./Message";

const ChatHistory = () => {
  const { chats, roomId } = useAppSelector(
    (state: RootState) => state.messages
  );

  const currChats = roomId
    ? chats.filter((data) => data.id === roomId)
    : undefined;
  return (
    <div className="messages__hist">
      {!currChats ? (
        <p>no room selected</p>
      ) : currChats.length === 0 ? (
        <p>No message</p>
      ) : (
        currChats[0].messages.map((msg) => {
          return <Message key={msg.createdAt} msg={msg} />;
        })
      )}
    </div>
  );
};

export default ChatHistory;
