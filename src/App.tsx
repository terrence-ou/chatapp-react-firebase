import { useState, useRef } from "react";

import Auth from "./components/Auth";
import AuthWrapper from "./components/AuthWrapper";
import Chat from "./components/Chat";

import "./App.css";

function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("auth-token")
  );
  const [room, setRoom] = useState<string | null>(
    localStorage.getItem("chat-room")
  );
  const inputRef = useRef<HTMLInputElement>(null); // ref room number input

  const handleSetAuthToken = (token: string | null) => {
    setAuthToken(token);
  };

  const handleSetRoom = (currRoom: string | null) => {
    if (currRoom && currRoom.length === 0) return;
    setRoom(currRoom);
    if (!currRoom) localStorage.removeItem("chat-room");
    else localStorage.setItem("chat-room", currRoom);
  };

  // If not logged in, render this part
  if (!authToken) {
    return (
      <main>
        <AuthWrapper
          authToken={authToken}
          handleSetAuthToken={handleSetAuthToken}
          handleSetRoom={handleSetRoom}
        >
          <Auth handleSetAuthToken={handleSetAuthToken} />
        </AuthWrapper>
      </main>
    );
  }

  return (
    <main>
      <AuthWrapper
        authToken={authToken}
        handleSetAuthToken={handleSetAuthToken}
        handleSetRoom={handleSetRoom}
      >
        {!room ? (
          <div>
            <h3>Eneter the room to join the chat</h3>
            <p>
              <em>Try 123321</em>
            </p>
            <input ref={inputRef} type="text" />
            <button
              onClick={() => {
                if (inputRef.current) handleSetRoom(inputRef.current.value);
              }}
            >
              Enter Chat
            </button>
          </div>
        ) : (
          <Chat room={room} handleSetRoom={handleSetRoom} />
        )}
      </AuthWrapper>
    </main>
  );
}

export default App;
