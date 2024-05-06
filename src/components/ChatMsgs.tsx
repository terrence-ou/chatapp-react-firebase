import { useAppSelector } from "../hooks/reduxHooks";
import type { RootState } from "../store";

const ChatMsgs = () => {
  const { chats, roomId } = useAppSelector(
    (state: RootState) => state.messages
  );
  const currChats = roomId
    ? chats.filter((data) => data.id === roomId)
    : undefined;
  return (
    <div className="messages">
      <h3>Messages</h3>
      {!currChats ? (
        <p>no room selected</p>
      ) : currChats.length === 0 ? (
        <p>No message</p>
      ) : (
        currChats[0].messages.map((msg) => {
          return (
            <p key={msg.createdAt}>
              {msg.sender} : {msg.text}
            </p>
          );
        })
      )}
    </div>
  );
};

export default ChatMsgs;
