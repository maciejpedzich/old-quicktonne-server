import User from './User';

type ChatMessage = {
  dateCreated: number;
  author: User;
  content: string;
};

export default ChatMessage;
