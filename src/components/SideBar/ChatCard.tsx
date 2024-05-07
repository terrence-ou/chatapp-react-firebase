import { useAppDispatch } from "../../hooks/reduxHooks";
import { messageActions } from "../../features/messageSlice";

interface ChatCardType {
  names: string[];
  address: string;
  roomId: string;
}

// The Card of a chat room; locates in the chatting app's side bar
const ChatCard = ({ names, address, roomId }: ChatCardType) => {
  const currName = localStorage.getItem("auth-name");
  const dispatch = useAppDispatch();

  return (
    <div className="chatcard">
      <button
        className="chatcard__btn"
        onClick={() => dispatch(messageActions.SET_ROOM(roomId))}
      >
        {names.map((name) => {
          if (currName !== name)
            return (
              <div key={name} className="font-bold">
                <span>{name}</span>
              </div>
            );
        })}
        <span>{address}</span>
      </button>
    </div>
  );
};

export default ChatCard;
