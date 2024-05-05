import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ChatRoomType } from "../types";

interface messageSliceType {
  roomId: string | null;
  chats: ChatRoomType[];
}

const initialState: messageSliceType = {
  roomId: null,
  chats: [],
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
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
