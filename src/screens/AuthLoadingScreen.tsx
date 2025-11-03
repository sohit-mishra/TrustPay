import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type AuthLoadingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AuthLoading'>;

interface Props {
  navigation: AuthLoadingNavigationProp;
}

const rnBiometrics = new ReactNativeBiometrics();

const AuthLoadingScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        // Check if user has enabled biometrics
        const enabled = await AsyncStorage.getItem('useBiometrics');
        const isEnabled = enabled === 'true';

        if (!isEnabled) {
          navigation.replace('Login');
          return;
        }

        // Check available biometrics
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        if (!available) {
          Alert.alert('No Biometrics', 'No biometric sensors available. Please login manually.');
          navigation.replace('Login');
          return;
        }

        // Create a friendly message for all types
        let promptMessage = 'Authenticate to continue';

        switch (biometryType) {
          case BiometryTypes.TouchID:
            promptMessage = 'Authenticate with Touch ID';
            break;
          case BiometryTypes.FaceID:
            promptMessage = 'Authenticate with Face ID';
            break;
          case BiometryTypes.Biometrics:
            promptMessage = 'Authenticate with Biometrics';
            break;
        }

        // Try biometric prompt
        const result = await rnBiometrics.simplePrompt({ promptMessage });

        if (result.success) {
          navigation.replace('Home');
        } else {
          Alert.alert('Cancelled', 'Authentication cancelled');
          navigation.replace('Login');
        }
      } catch (error) {
        console.log('Biometric authentication failed:', error);
        Alert.alert('Error', 'Biometric authentication failed. Please try again.');
        navigation.replace('Login');
      }
    };

    checkBiometrics();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00C2A8" />
    </View>
  );
};

export default AuthLoadingScreen;
