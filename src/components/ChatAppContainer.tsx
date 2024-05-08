import useSnapshot from "../hooks/useSnapshot";
import Sidebar from "./SideBar/Sidebar";
import MessageView from "./Messages/MessageView";

/* The body of the ChatRoomContainer component */
const ChatAppContainer = () => {
  useSnapshot();
  return (
    <div className="chatroom">
      <Sidebar />
      <MessageView />
    </div>
  );
};

export default ChatAppContainer;
