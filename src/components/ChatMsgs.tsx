import { ChatRoomType } from "../types";
interface ChatMsgsProps {
  chats: ChatRoomType[];
  currRoomID: string | null;
}

const ChatMsgs = ({ chats, currRoomID }: ChatMsgsProps) => {
  const currChats = currRoomID
    ? chats.filter((data) => data.id === currRoomID)
    : undefined;

  return (
    <div>
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
