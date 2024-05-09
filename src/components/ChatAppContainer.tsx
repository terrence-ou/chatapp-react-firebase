import useSnapshot from "../hooks/useSnapshot";
import Sidebar from "./SideBar/Sidebar";
import ChatView from "./Messages/ChatView";

/* The body of the ChatRoomContainer component */
const ChatAppContainer = () => {
  useSnapshot();
  return (
    <div className="chatroom">
      <Sidebar />
      <ChatView />
    </div>
  );
};

export default ChatAppContainer;
