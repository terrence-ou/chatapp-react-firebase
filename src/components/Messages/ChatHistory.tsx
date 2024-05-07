import { useAppSelector } from "../../hooks/reduxHooks";
import type { RootState } from "../../store";

const ChatHistory = () => {
  const { chats, roomId } = useAppSelector(
    (state: RootState) => state.messages
  );
  const currChats = roomId
    ? chats.filter((data) => data.id === roomId)
    : undefined;
  return (
    <div>
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

export default ChatHistory;
