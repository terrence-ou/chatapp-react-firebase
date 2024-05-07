const UserInput = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted");
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <textarea placeholder="Type your message here" />
      <button>Send</button>
    </form>
  );
};

export default UserInput;
