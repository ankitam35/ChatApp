export const fetchConversations = async () => {
    // Mocked API call
    return [
      { id: 1, users: ['user1', 'user2'], lastMessage: 'Hello there!' },
      { id: 2, users: ['user3', 'user4'], lastMessage: 'How are you?' },
    ];
  };
  
  export const fetchChatHistory = async (conversationId: number) => {
    // Mocked API call
    return [
      { id: 1, sender: 'user1', message: 'Hi!' },
      { id: 2, sender: 'user2', message: 'Hello!' },
    ];
  };
  