import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ChatRoomType, memberType, membersObj } from "../types";

interface messageSliceType {
  roomId: string | null;
  chats: ChatRoomType[];
  members: membersObj;
}

const initialState: messageSliceType = {
  roomId: null,
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
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
