interface ChatCardType {
  names: string[];
  address: string;
  onClick: () => void;
}

// The Card of a chat room; locates in the chatting app's side bar
const ChatCard = ({ names, address, onClick }: ChatCardType) => {
  const currName = localStorage.getItem("auth-name");
  return (
    <div>
      <button onClick={onClick}>
        {names.map((name) => {
          if (currName !== name)
            return (
              <div key={name}>
                <span>{name}</span>
                <br></br>
              </div>
            );
        })}
        <br />
        <span>{address}</span>
      </button>
    </div>
  );
};

export default ChatCard;
