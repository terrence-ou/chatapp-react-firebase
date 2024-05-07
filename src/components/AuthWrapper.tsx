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
  children,
}: AuthWrapperProps) => {
  const userSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("auth-uid");
    localStorage.removeItem("auth-name");
    handleSetAuthToken(null);
  };

  return (
    <>
      <div>
        {authToken && (
          <div>
            <p>{localStorage.getItem("auth-name")}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </div>
        )}
      </div>
      {children}
    </>
  );
};

export default AuthWrapper;
