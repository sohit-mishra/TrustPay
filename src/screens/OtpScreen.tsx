import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type OtpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Otp'>;
type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;

interface OtpScreenProps {
  navigation: OtpScreenNavigationProp;
  route: OtpScreenRouteProp;
}

const OtpScreen: React.FC<OtpScreenProps> = ({ navigation, route }) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [biometricsEnabled, setBiometricsEnabled] = useState<boolean>(false);
  const [timer, setTimer] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    const loadPreference = async () => {
      const storedValue = await AsyncStorage.getItem('useBiometrics');
      setBiometricsEnabled(storedValue === 'true');
    };
    loadPreference();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendEnabled(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const toggleBiometrics = async (value: boolean) => {
    setBiometricsEnabled(value);
    await AsyncStorage.setItem('useBiometrics', value ? 'true' : 'false');
  };

  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      await AsyncStorage.setItem('useBiometrics', biometricsEnabled ? 'true' : 'false');

      const enteredOtp = otp.join('');
      if (enteredOtp.length !== 6) {
        Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP');
        return;
      }
      navigation.replace('Home');
    } catch (error) {
      console.error('Error verifying OTP or fetching storage:', error);
    }
  };

  const handleResend = () => {
    if (!isResendEnabled) return;
    setTimer(30);
    setIsResendEnabled(false);
    setOtp(['', '', '', '', '', '']);
  };

  const isOtpValid = otp.join('').length === 6;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00C2A8" barStyle="light-content" />
      <Image source={require('../assets/images/otp.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {phone}</Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.verifyButton, !isOtpValid && { backgroundColor: '#B0E0DB' }]}
        onPress={handleVerify}
        disabled={!isOtpValid}>
        <Text style={styles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Enable Biometrics</Text>
        <Switch
          value={biometricsEnabled}
          onValueChange={toggleBiometrics}
          trackColor={{ false: '#ccc', true: '#00C2A8' }}
          thumbColor={biometricsEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.resendButton} onPress={handleResend} disabled={!isResendEnabled}>
        <Text
          style={[
            styles.resendText,
            !isResendEnabled && { color: '#999', textDecorationLine: 'none' },
          ]}>
          {isResendEnabled ? 'Didn’t receive OTP? Resend' : `Resend available in ${timer}s`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  image: { width: 200, height: 150, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginVertical: 10 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 },
  otpInput: { width: 45, height: 55, borderWidth: 1, borderColor: '#ccc', borderRadius: 12, textAlign: 'center', fontSize: 18, color: '#000', backgroundColor: '#fff' },
  verifyButton: { width: '100%', backgroundColor: '#00C2A8', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  verifyText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 25, paddingHorizontal: 5 },
  toggleLabel: { fontSize: 16, color: '#000', fontWeight: '500' },
  fingerprintButton: { flexDirection: 'row', alignItems: 'center', marginTop: 25 },
  fingerprintText: { fontSize: 16, color: '#00C2A8', fontWeight: '600' },
  resendButton: { marginTop: 25 },
  resendText: { fontSize: 14, color: '#007AFF', textDecorationLine: 'underline' },
});
