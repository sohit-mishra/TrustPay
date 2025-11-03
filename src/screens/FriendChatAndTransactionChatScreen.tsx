import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'FriendChatAndTransactionChat'
>;

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'friend';
  type?: 'text' | 'transaction';
  amount?: number;
  transactionType?: 'credit' | 'debit';
}

const FriendChatAndTransactionChatScreen: React.FC<Props> = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! How are you?', sender: 'friend' },
    { id: '2', text: 'All good! Just paid you for dinner 🍽️', sender: 'me' },
    {
      id: '3',
      text: 'Received ₹500 👍',
      sender: 'friend',
      type: 'transaction',
      amount: 500,
      transactionType: 'credit',
    },
    { id: '4', text: 'Cool! Thanks 😊', sender: 'me' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'me',
      type: 'text',
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
    Keyboard.dismiss();
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    const messageStyle = isMe ? styles.myMessage : styles.friendMessage;
    const textStyle = isMe ? styles.myMessageText : styles.friendMessageText;

    if (item.type === 'transaction') {
      const isCredit = item.transactionType === 'credit';
      return (
        <View
          style={[
            styles.transactionCard,
            isMe ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' },
            { backgroundColor: isCredit ? '#e8f5e9' : '#ffebee' },
          ]}
        >
          <View
            style={[
              styles.amountBox,
              { backgroundColor: isCredit ? '#c8e6c9' : '#ffcdd2' },
            ]}
          >
            <Icon
              name={isCredit ? 'arrow-downward' : 'arrow-upward'}
              size={20}
              color={isCredit ? '#2e7d32' : '#c62828'}
            />
            <Text
              style={[
                styles.amountText,
                { color: isCredit ? '#2e7d32' : '#c62828' },
              ]}
            >
              ₹{item.amount}
            </Text>
          </View>
          <Text
            style={[
              styles.transactionText,
              { color: isCredit ? '#2e7d32' : '#c62828' },
            ]}
          >
            {isCredit ? 'Received' : 'Sent'}
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.messageBubble, messageStyle]}>
        <Text style={textStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={26} color="#1565c0" />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Image
            source={require('../assets/images/profile.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.username}>Rahul Sharma</Text>
        </View>

        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            value={newMessage}
            onChangeText={setNewMessage}
            style={[styles.input, { flex: 2 }]}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('PaymentAmount')}
            style={[styles.actionButton, { backgroundColor: '#c62828' }]}
          >
            <Text style={styles.payText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={styles.actionButton}>
            <Icon name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  backButton: { marginRight: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  profileImage: { width: 38, height: 38, borderRadius: 19, marginRight: 10 },
  username: { fontSize: 18, fontWeight: '600', color: '#1565c0' },
  chatContainer: { padding: 16, paddingBottom: 100 },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 6,
  },
  myMessage: {
    backgroundColor: '#1565c0',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  friendMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  myMessageText: { color: '#fff', fontSize: 15 },
  friendMessageText: { color: '#333', fontSize: 15 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
  },
  input: {
    fontSize: 15,
    color: '#333',
    backgroundColor: '#f2f5f9',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  actionButton: {
    backgroundColor: '#1565c0',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 8,
  },
  payText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 15,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginVertical: 6,
    elevation: 1,
  },
  amountBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  amountText: { fontWeight: '700', fontSize: 16 },
  transactionText: { fontWeight: '600', fontSize: 15 },
});

export default FriendChatAndTransactionChatScreen;
