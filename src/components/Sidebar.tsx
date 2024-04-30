import { useEffect } from "react";
import {
  onSnapshot,
  query,
  where,
  collection,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Sidebar = () => {
  const chatRoomRef = collection(db, "chatRooms");
  const currUID = localStorage.getItem("auth-uid");

  useEffect(() => {
    const queryMessages = query(
      chatRoomRef,
      where("participants", "array-contains", currUID)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      snapshot.forEach((doc) => console.log(doc.data()));
    });

    return () => unsubscribe();
  }, []);

  // const handleAddDoc = async () => {
  //   await addDoc(chatRoomRef, {
  //     address: "125 Guest Street",
  //     participants: [
  //       "qAdipNhe9fUFf9mVeGzmmeu5PJL2",
  //       "gVw1aI9VszZpLCfKQqd8KRRmnz13",
  //     ],
  //     messages: [
  //       {
  //         sender: "Sung-Fu Han",
  //         createdAt: new Date().getTime(),
  //         text: "Multiple chat room test",
  //       },
  //       {
  //         sender: "Terrence Ou",
  //         createdAt: new Date().getTime(),
  //         text: "Check conversation",
  //       },
  //     ],
  //   });
  // };

  return (
    <div>
      <h3>Side Bar</h3>
      {/* <button onClick={handleAddDoc}>Add Data</button> */}
    </div>
  );
};

export default Sidebar;
