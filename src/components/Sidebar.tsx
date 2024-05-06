import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store";

import ChatCard from "./ChatCard";

const Sidebar = () => {
  const chats = useAppSelector((state: RootState) => state.messages.chats);
  return (
    <div className="sidebar">
      {chats.map((data) => {
        const names = Array.from(
          new Set(data.messages.map((message) => message.sender))
        );
        return (
          <ChatCard
            key={data.id}
            address={data.address}
            names={names}
            roomId={data.id}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
