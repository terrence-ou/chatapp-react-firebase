import { useState } from "react";

import Auth from "./components/Auth";
import AuthWrapper from "./components/AuthWrapper";

import ChatRoomContainer from "./components/ChatRoomContainer";

function App() {
  const [authUID, setAuthUID] = useState<string | null>(
    localStorage.getItem("auth-uid")
  );

  const handleSetAuthToken = (token: string | null) => {
    setAuthUID(token);
  };

  return (
    <main>
      <AuthWrapper authToken={authUID} handleSetAuthToken={handleSetAuthToken}>
        {!authUID ? (
          <Auth handleSetAuthToken={handleSetAuthToken} />
        ) : (
          <ChatRoomContainer />
        )}
      </AuthWrapper>
    </main>
  );
}

export default App;
