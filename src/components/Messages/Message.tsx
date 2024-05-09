import { useAppSelector } from "../../hooks/reduxHooks";
import { MessageType } from "../../types";
import { LOCAL_UID } from "../../consts";

import { getDisplayTime } from "../../utils";

interface MessageProps {
  msg: MessageType;
}

const Message = ({ msg }: MessageProps) => {
  const photoURL = useAppSelector(
    (state) => state.messages.members[msg.sender].photoURL
  );
  const currUser = localStorage.getItem(LOCAL_UID);
  const msgAlign = currUser === msg.sender ? "message__right" : "message__left";
  const dateAlign = currUser === msg.sender ? "text-end" : "text-start";
  const reverse = currUser === msg.sender ? " flex-row-reverse" : "";

  const displayTime = getDisplayTime(msg.createdAt);

  return (
    <div className={`message ${msgAlign}`}>
      <div className={"message__div" + reverse}>
        <img className="message__img" src={photoURL} />
        <div className={dateAlign}>
          <p className="message__date">{displayTime}</p>
          <p className="message__p">{msg.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
