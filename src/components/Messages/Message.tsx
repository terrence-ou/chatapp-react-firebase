import { useAppSelector } from "../../hooks/reduxHooks";
import { MessageType } from "../../types";
import { LOCAL_UID } from "../../consts";

interface MessageProps {
  msg: MessageType;
}

const Message = ({ msg }: MessageProps) => {
  const photoURL = useAppSelector(
    (state) => state.messages.members[msg.sender].photoURL
  );
  const currUser = localStorage.getItem(LOCAL_UID);
  const align = currUser === msg.sender ? "message__right" : "message__left";
  const reverse = currUser === msg.sender ? " flex-row-reverse" : "";
  return (
    <div className={`message ${align}`}>
      <div className={"message__div" + reverse}>
        <img className="message__img" src={photoURL} />
        <p className="message__p">{msg.text}</p>
        <p>{msg.createdAt}</p>
      </div>
    </div>
  );
};

export default Message;
