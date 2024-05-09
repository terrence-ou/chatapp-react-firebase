import ChatHistory from "./ChatHistory";
import UserInput from "./UserInput";

const ChatView = () => {
  return (
    <div className="messages">
      <ChatHistory />
      <UserInput />
    </div>
  );
};

export default ChatView;
