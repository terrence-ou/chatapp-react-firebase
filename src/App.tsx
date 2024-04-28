import { useState } from "react";
import Auth from "./components/Auth";

import "./App.css";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("auth-token")
  );
  const [isInChat, setIsInChat] = useState<boolean>(false);
  console.log(isInChat);

  console.log({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  });

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
