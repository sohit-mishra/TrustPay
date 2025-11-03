import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'PayUPI'>;

export default function PayUPIScreen({ navigation }: Props) {
  const [mobile, setMobile] = useState('');
  const [upiId, setUpiId] = useState('');
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

  const handleMobileChange = (text: string) => {
    setMobile(text);
    if (text.length > 0) setUpiId(''); 
  };

  const handleUpiChange = (text: string) => {
    setUpiId(text);
    if (text.length > 0) setMobile('');
  };

  const handleContinue = () => {
    const recipient = mobile || upiId;
    if (!recipient) return;
    navigation.navigate('PaymentAmount');
  };

  const isDisabled = !mobile && !upiId;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
       
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={26} color="#00C2A8" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pay UPI</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Enter Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#999"
              value={mobile}
              onChangeText={handleMobileChange}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <Text style={styles.orText}>OR</Text>

            <Text style={styles.label}>Enter UPI ID</Text>
            <TextInput
              style={styles.input}
              placeholder="example@upi"
              placeholderTextColor="#999"
              value={upiId}
              onChangeText={handleUpiChange}
              autoCapitalize="none"
            />
          </View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '90%' }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleContinue}
              disabled={isDisabled}
              style={[
                styles.continueButton,
                isDisabled && styles.disabledButton,
              ]}
            >
              <Text style={styles.continueText}>Continue</Text>
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

  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    position: 'relative',
    paddingHorizontal: 20,
  },
  headerBack: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00C2A8',
    textAlign: 'center',
  },

  form: {
    width: '90%',
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f5f7fb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '700',
    color: '#00C2A8',
  },
  continueButton: {
    backgroundColor: '#00C2A8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#b2dfdb',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
