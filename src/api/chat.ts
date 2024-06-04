export const fetchConversations = async () => {
    return [
      { id: 1, users: ['ankit'], lastMessage: 'Hello there!' },
      { id: 2, users: ['ankitam35'], lastMessage: 'How are you?' },
    ];
  };
  
  export const fetchChatHistory = async (conversationId: number) => {
    return [
      { id: 1, sender: 'ankit', message: 'Hello there!' },
      { id: 2, sender: 'ankit', message: 'Hi' },
    ];
  };
  