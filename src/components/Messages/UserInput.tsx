import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { sendMessageToFb } from "../../firebase/utils";
import type { MessageType } from "../../types";

const UserInput = () => {
  const [message, setMessage] = useState<string>("");
  const handleSetMessage = (text: string) => {
    setMessage(text);
  };

  const roomId = useAppSelector((state) => state.messages.roomId);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length === 0) return;
    const currUserName = localStorage.getItem("auth-name");
    if (!currUserName || !roomId) {
      console.error("username or room id invalid");
      return;
    }

    const newMessage: MessageType = {
      createdAt: new Date().getTime(),
      sender: currUserName,
      text: message,
    };

    await sendMessageToFb(newMessage, roomId);
    handleSetMessage("");
  };

  const inputDisabled = roomId === null;
  const defaultText = inputDisabled
    ? "Please select a room to start the conversation"
    : "Type your message here";

  return (
    <form className="messages__form" onSubmit={(event) => onSubmit(event)}>
      <textarea
        className="messages__textarea"
        value={message}
        onChange={(event) => handleSetMessage(event.target.value)}
        placeholder={defaultText}
        disabled={inputDisabled}
      />
      <button disabled={inputDisabled} className="disabled:opacity-35">
        Send
      </button>
    </form>
  );
};

export default UserInput;
