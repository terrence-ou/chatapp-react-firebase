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

export interface memberType {
  displayName: string;
  photoURL: string;
  online: boolean;
  uid: string;
  email: string;
}

export type membersObj = { [key: string]: memberType };
