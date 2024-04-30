import { ChatRoomType } from "../types";

import ChatCard from "./ChatCard";

interface SidebarType {
  chats: ChatRoomType[];
}

const Sidebar = ({ chats }: SidebarType) => {
  return (
    <div>
      <h3>Chat rooms</h3>
      {chats.map((data) => {
        const names = data.messages.map((message) => message.sender);
        return <ChatCard key={data.id} address={data.address} names={names} />;
      })}
    </div>
  );
};

export default Sidebar;
