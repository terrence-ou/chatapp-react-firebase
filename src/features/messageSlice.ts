import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ChatRoomType, memberType, membersObj } from "../types";
import { LOCAL_UID } from "../consts";

interface messageSliceType {
  roomId: string | null;
  authUID: string | null;
  chats: ChatRoomType[];
  members: membersObj;
}

const initialState: messageSliceType = {
  roomId: null,
  authUID: localStorage.getItem(LOCAL_UID),
  chats: [],
  members: {},
};

/* The body of the message slice */
export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    SET_CHATS: (state, action: PayloadAction<ChatRoomType[]>) => {
      state.chats = action.payload;
    },
    SET_ROOM: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    SET_MEMBER: (state, action: PayloadAction<memberType>) => {
      if (action.payload.uid in state.members) return state;
      state.members[action.payload.uid] = action.payload;
    },
    SET_UID: (state, action: PayloadAction<string | null>) => {
      state.authUID = action.payload;
    },
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
