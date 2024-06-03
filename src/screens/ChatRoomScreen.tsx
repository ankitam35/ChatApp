import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchChatHistoryStart, addMessage} from '../features/chat/chatSlice';
import {getChatHistory} from '../api/selectors';

const ChatRoomScreen = ({route}) => {
  const {conversationId} = route.params;
  const dispatch = useDispatch();
  const chatHistory = useSelector(getChatHistory);
  const messages = chatHistory[conversationId] || [];
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(fetchChatHistoryStart(conversationId));
  }, [dispatch, conversationId]);

  const handleSend = () => {
    if (text.trim()) {
      const message = {
        id: Date.now(),
        sender: 'currentUser',
        message: text.trim(),
      };
      dispatch(addMessage({conversationId, message}));
      setText('');
    }
  };

  const renderItem = ({item}) => (
    <View
      style={
        item.sender === 'currentUser' ? styles.myMessage : styles.theirMessage
      }>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: 8,
    margin: 4,
    borderRadius: 8,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 8,
    margin: 4,
    borderRadius: 8,
  },
});

export default ChatRoomScreen;
