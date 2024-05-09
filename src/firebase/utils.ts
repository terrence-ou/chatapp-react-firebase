import { auth, provider, db } from "./firebase-config";
import { type User, signInWithPopup, signOut } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
  where,
  query,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { LOCAL_UID, LOCAL_NAME } from "../consts";
import type { MessageType } from "../types";

// Sign-in function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem(LOCAL_UID, result.user.uid);
    localStorage.setItem(LOCAL_NAME, result.user.displayName!);
    await updateUserData(result.user);
  } catch (error) {
    console.error("Failed to sign in", error);
  }
};

// Sign-out function
export const userSignOut = async () => {
  try {
    await signOut(auth);
    // set online to false
    await updateDoc(doc(db, "users", localStorage.getItem(LOCAL_UID)!), {
      online: false,
    });
    localStorage.removeItem(LOCAL_UID);
    localStorage.removeItem(LOCAL_NAME);
  } catch (error) {
    console.error("Failed to sign out", error);
  }
};

// Push new message to the database
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

// Push/update the user data to/in the data base
export const updateUserData = async (userInfo: User) => {
  const usersDataRef = collection(db, "users");
  const queryMessage = query(usersDataRef, where("uid", "==", userInfo.uid));
  const currentUserInfo = {
    email: userInfo.email,
    photoURL: userInfo.photoURL,
    displayName: userInfo.displayName,
    uid: userInfo.uid,
    online: true,
  };
  const result = await getDocs(queryMessage);
  if (result.docs.length === 0) {
    await setDoc(doc(db, "users", userInfo.uid), currentUserInfo);
  } else {
    await updateDoc(doc(db, "users", userInfo.uid), currentUserInfo);
  }
};

export const getUserInfo = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const userInfo = await getDoc(docRef);
  return userInfo.data();
};
