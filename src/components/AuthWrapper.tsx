import { userSignOut } from "../firebase/utils";

interface AuthWrapperProps {
  authToken: string | null;
  handleSetAuthToken: (token: string | null) => void;
  children?: React.ReactNode;
}

const AuthWrapper = ({ authToken, children }: AuthWrapperProps) => {
  return (
    <>
      <div>
        {authToken && (
          <div>
            <p>{localStorage.getItem("auth-name")}</p>
            <button onClick={() => userSignOut()}>Sign Out</button>
          </div>
        )}
      </div>
      {children}
    </>
  );
};

export default AuthWrapper;
