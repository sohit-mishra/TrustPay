import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionHistory'>;

const TransactionHistoryScreen = ({ navigation }: Props) => {
  const transaction = {
    id: 'UPI12345XYZ',
    to: 'Zomato',
    from: 'HDFC Bank',
    trustPayId: 'TP87654321',
    amount: 560.75,
    time: '02 Nov 2025, 08:25 PM',
  };

  const handleBack = () => navigation.goBack();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Transaction Details:\n\nTo: ${transaction.to}\nFrom: ${transaction.from}\nAmount: ₹${transaction.amount}\nTime: ${transaction.time}\nUPI ID: ${transaction.id}\nTrust Pay ID: ${transaction.trustPayId}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Transaction Info */}
      <View style={styles.card}>
        <Text style={styles.toText}>To: {transaction.to}</Text>
        <Text style={styles.amount}>₹{transaction.amount.toFixed(2)}</Text>
        <Text style={styles.bankText}>{transaction.from}</Text>
        <Text style={styles.time}>{transaction.time}</Text>

        <View style={styles.separator} />

        <Text style={styles.infoText}>UPI Transaction ID: {transaction.id}</Text>
        <Text style={styles.infoText}>To: {transaction.to}</Text>
        <Text style={styles.infoText}>From: {transaction.from}</Text>
        <Text style={styles.infoText}>Trust Pay ID: {transaction.trustPayId}</Text>
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Icon name="share" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.shareText}>Share Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  card: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  toText: {
    fontSize: 16,
    color: '#555',
  },
  amount: {
    fontSize: 26,
    fontWeight: '700',
    color: '#00C2A8',
    marginVertical: 10,
  },
  bankText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  time: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C2A8',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 40,
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
