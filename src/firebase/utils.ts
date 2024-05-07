import { auth, provider, db } from "./firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { MessageType } from "../types";

type authSetter = (token: string | null) => void;

export const signInWithGoogle = async (handleSetAuthToken: authSetter) => {
  try {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("auth-uid", result.user.uid);
    localStorage.setItem("auth-name", result.user.displayName!);
    handleSetAuthToken(result.user.refreshToken);
  } catch (error) {
    console.error("Failed to sign in", error);
  }
};

export const userSignOut = async (handleSetAuthToken: authSetter) => {
  try {
    await signOut(auth);
    localStorage.removeItem("auth-uid");
    localStorage.removeItem("auth-name");
    handleSetAuthToken(null);
  } catch (error) {
    console.error("Failed to sign out", error);
  }
};

export const sendMessageToFb = async (message: MessageType, roomId: string) => {
  const roomRef = doc(db, "chatRooms", roomId);
  try {
    await updateDoc(roomRef, {
      messages: arrayUnion(message),
    });
  } catch (error) {
    console.error(error);
  }
};
