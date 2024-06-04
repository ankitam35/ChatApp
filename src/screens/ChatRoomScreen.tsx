import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchChatHistoryStart, addMessage} from '../features/chat/chatSlice';
import {getChatHistory} from '../api/selectors';
import Clipboard from '@react-native-clipboard/clipboard';
import {launchImageLibrary} from 'react-native-image-picker';

const ChatRoomScreen = ({route}:any) => {
  const {conversationId} = route.params;
  const dispatch = useDispatch();
  const chatHistory = useSelector(getChatHistory);
  const messages = chatHistory[conversationId] || [];
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchChatHistoryStart(conversationId));
  }, [dispatch, conversationId]);

  const handleSend = () => {
    if (text.trim() || image) {
      const message = {
        id: Date.now(),
        sender: 'currentUser',
        message: text.trim(),
        image: image?.uri,
      };
      dispatch(addMessage({conversationId, message}));
      setText('');
      setImage(null);
    }
  };

  const handleLongPress = (message: string) => {
    Clipboard.setString(message);
    Alert.alert('', 'Copied to Clipboard');
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };
  
    launchImageLibrary(options, (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response?.error);
      } else {
        setImage(response.assets[0]);
      }
    });
  };

  const renderItem = ({item}:any) => (
    <TouchableOpacity
      style={item.sender === 'currentUser' ? styles.myMessage : styles.theirMessage}
      onLongPress={() => handleLongPress(item.message)}>
      <Text>{item.message}</Text>
      {item.image && <Image source={{uri: item.image}} style={styles.image} />}
    </TouchableOpacity>
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
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          <Text style={styles.imagePickerText}>Pick Image</Text>
        </TouchableOpacity>
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
  imagePicker: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 5,
  },
});

export default ChatRoomScreen;
