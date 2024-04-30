import { useState } from "react";

import Auth from "./components/Auth";
import AuthWrapper from "./components/AuthWrapper";
// import Chat from "./components/Chat";

import "./App.css";
import Sidebar from "./components/Sidebar";

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
          <Sidebar />
        )}
      </AuthWrapper>
    </main>
  );
}

export default App;
