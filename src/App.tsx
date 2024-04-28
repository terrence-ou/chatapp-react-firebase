import { useState } from "react";
import Auth from "./components/Auth";

import "./App.css";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("auth-token")
  );
  const [isInChat, setIsInChat] = useState<boolean>(false);

  const handleSetAuthToken = (token: string | null) => {
    setAuthToken(token);
  };

  const handleSetIsInChat = (currState: boolean) => {
    setIsInChat(currState);
  };

  if (!authToken) {
    return (
      <main>
        <AuthWrapper
          authToken={authToken}
          handleSetAuthToken={handleSetAuthToken}
          handleSetIsInChat={handleSetIsInChat}
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
        handleSetIsInChat={handleSetIsInChat}
      ></AuthWrapper>
    </main>
  );
}

export default App;
