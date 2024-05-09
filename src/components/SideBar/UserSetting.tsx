import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { messageActions } from "../../features/messageSlice";
import { userSignOut } from "../../firebase/utils";

const UserSetting = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.messages.authUID);
  const members = useAppSelector((state) => state.messages.members);
  const url = uid && uid in members ? members[uid].photoURL : undefined;
  const handleUserSignOut = async () => {
    await userSignOut();
    dispatch(messageActions.SET_UID(null));
  };

  return (
    <div className="sidebar__user">
      {url !== undefined && (
        <img className="chatcard__img" src={url} alt="current user's photo" />
      )}
      <button onClick={() => handleUserSignOut()}>Sign Out</button>
    </div>
  );
};

export default UserSetting;
