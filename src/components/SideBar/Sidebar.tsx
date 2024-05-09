import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../store";

import ChatCard from "./ChatCard";
import UserSetting from "./UserSetting";

const Sidebar = () => {
  const chats = useAppSelector((state: RootState) => state.messages.chats);
  const members = useAppSelector((state: RootState) => state.messages.members);
  const currUID = useAppSelector((state: RootState) => state.messages.authUID);
  return (
    <div className="sidebar">
      <div className="sidebar__rooms">
        {chats.map((data) => {
          let otherName = undefined;
          let otherPhotoURL = undefined;
          const otherUID = data.participants.filter((uid) => uid !== currUID);
          if (otherUID.length > 0 && otherUID[0] in members) {
            otherName = members[otherUID[0]].displayName;
            otherPhotoURL = members[otherUID[0]].photoURL;
          }
          return (
            <ChatCard
              key={data.id}
              address={data.address}
              name={otherName}
              roomId={data.id}
              photoURL={otherPhotoURL}
            />
          );
        })}
      </div>
      <UserSetting />
    </div>
  );
};

export default Sidebar;
