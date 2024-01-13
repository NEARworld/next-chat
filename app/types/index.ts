import { Conversation, Message, User } from '@prisma/client';

export type FullMessages = Message & {
  sender: User;
  seen: User[];
};

export type FullConversation = Conversation & {
  users: User[];
  messages: FullMessages[];
};
