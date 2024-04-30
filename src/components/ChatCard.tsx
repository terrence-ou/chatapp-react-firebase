interface ChatCardType {
  names: string[];
  address: string;
}

const ChatCard = ({ names, address }: ChatCardType) => {
  const currName = localStorage.getItem("auth-name");
  return (
    <div>
      <button>
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
