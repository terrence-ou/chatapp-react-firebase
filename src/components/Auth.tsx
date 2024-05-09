import { useAppDispatch } from "../hooks/reduxHooks";
import { messageActions } from "../features/messageSlice";
import { signInWithGoogle } from "../firebase/utils";
import { LOCAL_UID } from "../consts";

const Auth = () => {
  const dispatch = useAppDispatch();

  const handleUserSignIn = async () => {
    await signInWithGoogle();
    const uid = localStorage.getItem(LOCAL_UID);
    dispatch(messageActions.SET_UID(uid));
  };

  return (
    <div>
      <h3>Sign-in with Google to Continue</h3>
      <button onClick={() => handleUserSignIn()}>Sign in</button>
    </div>
  );
};

export default Auth;
