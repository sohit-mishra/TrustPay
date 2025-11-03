import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentAmount'>;

export default function PaymentAmountScreen({ navigation }: Props) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than ₹0.');
      return;
    }

    Alert.alert(
      '✅ Payment Successful',
      `You’ve sent ₹${amount} to Rahul Sharma via ${selectedBank}.`,
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >

          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" size={28} color="#1565c0" />
          </TouchableOpacity>


          <View style={styles.profileContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>
            <Text style={styles.recipientName}>
              <Text style={styles.bankLabel}>Banking Name: </Text>
              Rahul Sharma
            </Text>
            <Text style={styles.upiText}>UPI ID: rahulsharma@upi</Text>
          </View>



          <View style={styles.form}>
            <TextInput
              style={styles.amountInput}
              placeholder="₹ 0.00"
              placeholderTextColor="#aaa"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              caretHidden
            />
            <TextInput
              style={styles.noteInput}
              placeholder="Add a note (optional)"
              placeholderTextColor="#999"
              value={note}
              onChangeText={setNote}
              caretHidden
            />
          </View>


          <View style={styles.accountSection}>
            <Text style={styles.chooseText}>Choose account to pay with</Text>

            <TouchableOpacity
              style={[
                styles.bankOption,
                selectedBank === 'HDFC Bank' && styles.bankOptionSelected,
              ]}
              onPress={() => setSelectedBank('HDFC Bank')}
            >
              <Image
                source={require('../assets/images/hdfc.png')}
                style={styles.bankLogo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.bankName}>HDFC Bank</Text>
                <Text style={styles.accountInfo}>Savings • ****1635</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bankOption,
                selectedBank === 'ICICI Bank' && styles.bankOptionSelected,
              ]}
              onPress={() => setSelectedBank('ICICI Bank')}
            >
              <Image
                source={require('../assets/bank/icici.png')}
                style={styles.bankLogo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.bankName}>ICICI Bank</Text>
                <Text style={styles.accountInfo}>Current • ****4391</Text>
              </View>
            </TouchableOpacity>
          </View>


          <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '90%' }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handlePayment}
              style={styles.payButton}
            >
              <Text style={styles.payText}>
                {amount ? `Pay ₹${amount}` : 'Pay'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { alignItems: 'center', paddingVertical: 30 },

  closeIcon: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },

  profileContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    backgroundColor: '#00C2A8',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#fff', fontSize: 34, fontWeight: '700' },

  recipientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00C2A8',
    textAlign: 'center',
    marginTop: 5,
  },
  upiText: { fontSize: 15, color: '#555', marginTop: 2 },

  form: { width: '85%', alignItems: 'center', marginVertical: 20 },
  amountInput: {
    width: '100%',
    backgroundColor: '#ffffffff',
    borderRadius: 14,
    fontSize: 38,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 18,
    marginBottom: 15,
  },
  noteInput: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },

  bankLabel: {
    color: '#333',
    fontWeight: '600',
  },
  accountSection: {
    width: '90%',
    marginTop: 15,
    marginBottom: 25,
  },
  chooseText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
    marginBottom: 12,
  },

  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  bankOptionSelected: {
    borderColor: '#0077CC',
    backgroundColor: '#e6f2ff',
  },
  bankLogo: { width: 40, height: 40, marginRight: 12 },
  bankName: { fontSize: 16, fontWeight: '700', color: '#1565c0' },
  accountInfo: { color: '#666', fontSize: 13, marginTop: 2 },

  payButton: {
    backgroundColor: '#00C2A8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  payText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
