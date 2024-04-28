import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

interface AuthWrapperProps {
  authToken: string | null;
  handleSetAuthToken: (token: string | null) => void;
  handleSetRoom: (currRoom: string | null) => void;
  children?: React.ReactNode;
}

const AuthWrapper = ({
  authToken,
  handleSetAuthToken,
  handleSetRoom,
  children,
}: AuthWrapperProps) => {
  const userSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("auth-token");
    handleSetAuthToken(null);
    handleSetRoom(null);
  };

  return (
    <div>
      <div>
        <h1>Chat App</h1>
      </div>
      <div>{children}</div>
      {authToken && (
        <div>
          <button onClick={userSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default AuthWrapper;
