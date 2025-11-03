import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AllBank'>;

export default function AllBankScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  const banks = [
    { id: '1', name: 'HDFC Bank', logo: require('../assets/bank/hdfc.png') },
    { id: '2', name: 'ICICI Bank', logo: require('../assets/bank/icici.png') },
    { id: '3', name: 'State Bank of India', logo: require('../assets/bank/sbi.png') },
    { id: '4', name: 'Axis Bank', logo: require('../assets/bank/axis.png') },
    { id: '5', name: 'Punjab National Bank', logo: require('../assets/bank/pnb.png') },
    { id: '6', name: 'Kotak Mahindra Bank', logo: require('../assets/bank/kotak.png') },
    { id: '7', name: 'Yes Bank', logo: require('../assets/bank/yes.png') },
    { id: '8', name: 'Bank of Baroda', logo: require('../assets/bank/bob.png') },
    { id: '9', name: 'IndusInd Bank', logo: require('../assets/bank/indusind.png') },
    { id: '10', name: 'IDFC FIRST Bank', logo: require('../assets/bank/idfc.png') },
    { id: '11', name: 'Canara Bank', logo: require('../assets/bank/canara.png') },
    { id: '12', name: 'Union Bank of India', logo: require('../assets/bank/union.png') },
    { id: '13', name: 'Central Bank of India', logo: require('../assets/bank/central.png') },
    { id: '14', name: 'Indian Bank', logo: require('../assets/bank/indian.png') },
    { id: '15', name: 'Federal Bank', logo: require('../assets/bank/federal.png') },
  ];


  const filteredBanks = banks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBank = (bankName: string) => {
    console.log('Selected:', bankName);
  };

  return (
    <LinearGradient colors={['#f6f9ff', '#ffffff']} style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerSection}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Banks</Text>
          <View style={{ width: 26 }} />
        </View>

        <Image
          source={require('../assets/images/bankAccount.png')}
          style={styles.headerPoster}
        />

        <View style={styles.searchBar}>
          <Icon name="search" size={22} color="#888" />
          <TextInput
            placeholder="Search bank name"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredBanks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bankItem}
            activeOpacity={0.7}
            onPress={() => handleSelectBank(item.name)}
          >
            <Image source={item.logo} style={styles.bankLogo} />
            <Text style={styles.bankName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No banks found</Text>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  headerPoster: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f8fc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
    marginTop: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    elevation: 2,
    marginHorizontal: 20,
  },
  bankLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
    fontSize: 14,
  },
});
