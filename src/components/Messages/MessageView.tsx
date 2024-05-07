import ChatHistory from "./ChatHistory";
import UserInput from "./UserInput";

const MessageView = () => {
  return (
    <div className="messages">
      <ChatHistory />
      <UserInput />
    </div>
  );
};

export default MessageView;
