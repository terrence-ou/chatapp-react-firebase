import { signInWithGoogle } from "../firebase/utils";

interface AuthProps {
  handleSetAuthToken: (token: string | null) => void;
}

const Auth = ({ handleSetAuthToken }: AuthProps) => {
  return (
    <div>
      <h3>Sign-in with Google to Continue</h3>
      <button onClick={() => signInWithGoogle(handleSetAuthToken)}>
        Sign in
      </button>
    </div>
  );
};

export default Auth;
