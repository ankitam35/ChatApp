import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationsStart } from '../features/chat/chatSlice';
import { RootState } from '../app/rootReducer';

const ConversationListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const conversations = useSelector((state: RootState) => state.chat.conversations);
  const loading = useSelector((state: RootState) => state.chat.loading);

  useEffect(() => {
    dispatch(fetchConversationsStart());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ChatRoom', { conversationId: item.id })}
    >
      <Text style={styles.conversationText}>{item.users.join(', ')}</Text>
      <Text style={styles.conversationLastMessage}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  conversationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  conversationText: {
    fontSize: 18,
  },
  conversationLastMessage: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ConversationListScreen;
