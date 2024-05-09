import { useAppDispatch } from "../../hooks/reduxHooks";
import { messageActions } from "../../features/messageSlice";

interface ChatCardType {
  name: string | undefined;
  address: string;
  roomId: string;
  photoURL: string | undefined;
  // active: boolean;
}

// The Card of a chat room; locates in the chatting app's side bar
const ChatCard = ({
  name,
  address,
  roomId,
  photoURL,
  // active,
}: ChatCardType) => {
  const dispatch = useAppDispatch();
  return (
    <div className="chatcard">
      <button
        className="chatcard__btn"
        onClick={() => dispatch(messageActions.SET_ROOM(roomId))}
      >
        {photoURL !== undefined && (
          <img
            src={photoURL}
            className="chatcard__img"
            alt={`${name}'s photo`}
          />
        )}
        {name !== undefined && (
          <div key={name}>
            <span className="font-bold text-lg">{name}</span>
            <br />
            <span>{address}</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatCard;
