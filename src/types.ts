export interface MessageType {
  createdAt: number;
  sender: string;
  text: string;
}

export interface ChatRoomType {
  address: string;
  participants: string[];
  messages: MessageType[];
  id: string;
}
