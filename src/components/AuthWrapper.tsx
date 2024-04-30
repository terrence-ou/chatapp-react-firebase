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
    localStorage.removeItem("auth-name");
    handleSetAuthToken(null);
  };

  return (
    <div>
      <div>
        <h3>Chat App</h3>
        {authToken && (
          <div>
            <p>Current user: {localStorage.getItem("auth-name")}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthWrapper;
