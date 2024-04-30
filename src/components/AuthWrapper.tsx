import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

interface AuthWrapperProps {
  authToken: string | null;
  handleSetAuthToken: (token: string | null) => void;
  children?: React.ReactNode;
}

const AuthWrapper = ({
  authToken,
  handleSetAuthToken,
  // handleSetRoom,
  children,
}: AuthWrapperProps) => {
  const userSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("auth-uid");
    handleSetAuthToken(null);
  };

  return (
    <div>
      <div>
        <h3>Chat App</h3>
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
