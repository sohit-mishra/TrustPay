import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  View,
  Pressable,
  PermissionsAndroid,
  Alert,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import SimData from 'react-native-sim-data';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

interface SimInfo {
  phoneNumber0?: string;
  phoneNumber1?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [countryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [simNumbers, setSimNumbers] = useState<string[]>([]);
  const [selectedSim, setSelectedSim] = useState<string | null>(null);

  useEffect(() => {
    const loadSimAndDeviceInfo = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
          ]);

          const permissionGranted =
            granted['android.permission.READ_PHONE_STATE'] === PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.READ_PHONE_NUMBERS'] === PermissionsAndroid.RESULTS.GRANTED;

          if (permissionGranted) {
            const simInfo: SimInfo = SimData.getSimInfo();
            const numbers: string[] = [];

            if (simInfo.phoneNumber0) numbers.push(simInfo.phoneNumber0);
            if (simInfo.phoneNumber1) numbers.push(simInfo.phoneNumber1);
            setSimNumbers(numbers);

            if (numbers.length > 0) {
              const digits = numbers[0].replace(/\D/g, '');
              setPhone(digits);
            }
          } else {
            setSimNumbers([]);
          }
        }
      } catch (error) {
        console.log('Error fetching SIM info:', error);
        setSimNumbers([]);
      }
    };

    loadSimAndDeviceInfo();
  }, []);

  const handleSelectSim = (num: string) => {
    const digits = num.replace(countryCode, '').replace(/\D/g, '').trim();
    setPhone(digits);
    setSelectedSim(num);
  };

  const handleLogin = () => {
    if (phone.length !== 10) {
      Alert.alert('Validation', 'Please enter a valid 10-digit phone number');
      return;
    }

    navigation.navigate('Otp', { phone: `${countryCode}${phone}` });
  };

  const isValidPhone = phone.trim().length === 10;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#00C2A8" barStyle="light-content" />

      <View style={styles.headerBox}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login using your mobile number</Text>

      <View style={styles.phoneRow}>
        <TouchableOpacity style={styles.countryCodeButton}>
          <Text style={styles.countryCodeText}>{countryCode}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {simNumbers.length > 0 && (
        <View style={styles.deviceInfoBox}>
          <Text style={styles.simTitle}>Detected SIM Numbers:</Text>
          <View style={styles.simRow}>
            {simNumbers.map((num) => (
              <Pressable
                key={num}
                onPress={() => handleSelectSim(num)}
                style={[styles.simBadge, selectedSim === num && styles.simBadgeSelected]}>
                <Text style={[styles.simText, selectedSim === num && styles.simTextSelected]}>
                  📱 {num}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !isValidPhone && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!isValidPhone}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        By continuing, you agree to our{' '}
        <Text style={styles.link}>Terms & Privacy Policy</Text>
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  headerBox: {
    marginBottom: 0,
    alignItems: 'center',
    marginTop: -80,
  },
  logoImage: {
    width: 250,
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  countryCodeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  deviceInfoBox: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  simTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  simRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  simBadge: {
    backgroundColor: '#E6F0EF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 4,
    alignItems: 'center',
  },
  simBadgeSelected: {
    backgroundColor: '#00C2A8',
  },
  simText: {
    fontSize: 15,
    color: '#1D3D47',
    fontWeight: '500',
  },
  simTextSelected: {
    color: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#00C2A8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#00C2A8',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#A0E4DA',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    lineHeight: 18,
  },
  link: {
    color: Platform.OS === 'ios' ? '#007AFF' : '#00C2A8',
    fontWeight: '600',
  },
});
