import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethod'>;

export default function PaymentMethodScreen({ navigation }: Props) {
  const handleBack = () => navigation.goBack();
  const handleAddBank = () => navigation.navigate('AllBank');
  const handleBankScan = () => navigation.navigate('QrCode');

  return (
    <LinearGradient colors={['#f6f9ff', '#ffffff']} style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 26 }} />
      </View>

      <TouchableOpacity style={styles.section} onPress={handleBankScan}>
        <View style={styles.row}>
          <Image
            source={require('../assets/bank/hdfc.png')}
            style={styles.bankIcon}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.title}>HDFC Bank</Text>
            <Text style={styles.subText}>Savings Account • 5842</Text>
            <Text style={styles.primaryText}>Primary Account</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleBankScan}>
        <View style={styles.row}>
          <Image
            source={require('../assets/bank/icici.png')}
            style={styles.bankIcon}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.title}>ICICI Bank</Text>
            <Text style={styles.subText}>Savings Account • 5452</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addSection} onPress={handleAddBank}>
        <View style={styles.row}>
          <Icon name="account-balance" size={24} color="#ffffffff" />
          <Text style={[styles.title, { marginLeft: 12, color: '#ffffffff' }]}>
            Add Bank Account
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    elevation: 3,
  },
  headerImage: {
    width: '90%',
    height: 140,
    resizeMode: 'contain',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  subText: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  primaryText: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#E6F0FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  addSection: {
    backgroundColor: '#00C2A8',
    borderRadius: 16,
    padding: 25,
    elevation: 3,
    shadowColor: '#a70000ff',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
