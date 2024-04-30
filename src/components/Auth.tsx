import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

interface AuthProps {
  handleSetAuthToken: (token: string | null) => void;
}

const Auth = ({ handleSetAuthToken }: AuthProps) => {
  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("auth-uid", result.user.uid);
      handleSetAuthToken(result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Sign-in with Google to Continue</h3>
      <button onClick={signinWithGoogle}>Sign in</button>
    </div>
  );
};

export default Auth;
