import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckBankBalance'>;

const transactions = [
  { id: '1', title: 'Grocery Store', amount: -3750, icon: 'shopping-cart' },
  { id: '2', title: 'Salary Deposit', amount: 50000, icon: 'credit-card' },
  { id: '3', title: 'Netflix Subscription', amount: -499, icon: 'subscriptions' },
  { id: '4', title: 'Coffee Shop', amount: -180, icon: 'local-cafe' },
];

const formatRupees = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);

const CheckBalanceScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={26} color="#278104" />
        </TouchableOpacity>
        <Text style={styles.header}>Bank Balance</Text>
        <View style={{ width: 30 }} />
      </View>

      <LinearGradient
        colors={['#00C2A8', '#1565c0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceCard}
      >
        <View style={styles.cardTopRow}>
          <Image
            source={require('../assets/images/hdfc.png')}
            style={styles.bankImage}
            resizeMode="contain"
          />
          <Text style={styles.bankName}>HDFC Bank</Text>
        </View>

        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.amount}>{formatRupees(16135)}</Text>
        <Text style={styles.accountType}>Savings Account •••• 2345</Text>
      </LinearGradient>

      <Text style={styles.subHeader}>Recent Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.transactionItem}
            onPress={() => navigation.navigate('TransactionHistory')}
            activeOpacity={0.7}
          >
            <View style={styles.transactionLeft}>
              <View style={styles.iconCircle}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={item.amount < 0 ? '#d32f2f' : '#2e7d32'}
                />
              </View>
              <Text style={styles.transactionTitle}>{item.title}</Text>
            </View>

            <Text
              style={[
                styles.transactionAmount,
                item.amount < 0 ? styles.expense : styles.credit,
              ]}
            >
              {formatRupees(item.amount)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  backButton: {
    padding: 6,
    borderRadius: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1565c0',
  },
  balanceCard: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  bankName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#e3f2fd',
    marginBottom: 6,
  },
  amount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
  },
  accountType: {
    fontSize: 15,
    color: '#c8e6c9',
    marginTop: 6,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d47a1',
    marginBottom: 12,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  expense: {
    color: '#d32f2f',
  },
  credit: {
    color: '#2e7d32',
  },
});

export default CheckBalanceScreen;
