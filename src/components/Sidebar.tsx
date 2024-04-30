import { ChatRoomType } from "../types";

import ChatCard from "./ChatCard";

interface SidebarType {
  chats: ChatRoomType[];
  handleSetCurrRoomID: (id: string) => void;
}

const Sidebar = ({ chats, handleSetCurrRoomID }: SidebarType) => {
  return (
    <div>
      <h3>Chat rooms</h3>
      {chats.map((data) => {
        const names = Array.from(
          new Set(data.messages.map((message) => message.sender))
        );
        return (
          <ChatCard
            key={data.id}
            address={data.address}
            names={names}
            onClick={() => handleSetCurrRoomID(data.id)}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
