import { useAppSelector } from "../../hooks/reduxHooks";
import type { RootState } from "../../store";

const ChatHistory = () => {
  const { chats, roomId } = useAppSelector(
    (state: RootState) => state.messages
  );

  const currUser = localStorage.getItem("auth-name");
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
          const align = currUser === msg.sender ? "text-right" : "text-left";
          return (
            <p key={msg.createdAt} className={align}>
              {msg.text}
            </p>
          );
        })
      )}
    </div>
  );
};

export default ChatHistory;
