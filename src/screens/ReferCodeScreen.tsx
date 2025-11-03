import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Share,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ReferCode'>;

type Referral = {
  id: string;
  name: string;
  joined: boolean;
  amount: number;
};

const ReferCodeScreen = ({ navigation }: Props) => {
  const referCode = 'AB250REF';
  const contactNumber = '+918888888888';

const [referrals] = useState<Referral[]>([
  { id: '1', name: 'Ravi Sharma', joined: true, amount: 250 },
  { id: '2', name: 'Anjali Patel', joined: true, amount: 250 },
  { id: '3', name: 'Rahul Verma', joined: false, amount: 0 },
  { id: '4', name: 'Neha Gupta', joined: true, amount: 250 },
  { id: '5', name: 'Arjun Mehta', joined: false, amount: 0 },
  { id: '6', name: 'Priya Singh', joined: true, amount: 250 },
  { id: '7', name: 'Vikas Yadav', joined: false, amount: 0 },
  { id: '8', name: 'Sneha Nair', joined: true, amount: 250 },
  { id: '9', name: 'Manoj Kumar', joined: true, amount: 250 },
  { id: '10', name: 'Kritika Bose', joined: false, amount: 0 },
]);


  const handleBack = () => navigation.goBack();

  const handleCopy = () => Clipboard.setString(referCode);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join AllBank App and get ₹250 cashback! Use my code: ${referCode}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleWhatsApp = async () => {
    const message = `Hey! Join AllBank App and get ₹250 cashback! Use my code: ${referCode}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('WhatsApp not installed', 'Please install WhatsApp to send message');
    }
  };

  const handleSMS = async () => {
    const message = `Join AllBank App and get ₹250 cashback! Use my code: ${referCode}`;
    const smsUrl = `sms:${contactNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl);
  };

  const renderReferral = ({ item }: { item: Referral }) => (
    <View style={styles.referralCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name={item.joined ? 'check-circle' : 'hourglass-empty'}
          size={22}
          color={item.joined ? '#00C2A8' : '#bbb'}
          style={{ marginRight: 10 }}
        />
        <View>
          <Text style={styles.referralName}>{item.name}</Text>
          <Text style={styles.referralStatus}>
            {item.joined ? 'Joined & Earned ₹250' : 'Pending Join'}
          </Text>
        </View>
      </View>
      {item.joined && <Text style={styles.referralAmount}>+₹{item.amount}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

  
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
        <View style={{ width: 26 }} />
      </View>

      
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/refer.png')}
          style={styles.image}
        />
      </View>

    
      <Text style={styles.title}>Invite Friends & Earn Rewards</Text>
      <Text style={styles.subtitle}>
        Friends who join using your code get ₹250 cashback!
      </Text>

    
      <View style={styles.codeCard}>
        <Text style={styles.codeText}>{referCode}</Text>
        <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
          <Icon name="content-copy" size={20} color="#0056D2" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Icon name="share" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.shareText}>Share Invite</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Joined Referrals</Text>
      <FlatList
        data={referrals}
        renderItem={renderReferral}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

    </View>
  );
};

export default ReferCodeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111' },
  imageContainer: { alignItems: 'center', marginVertical: 20 },
  image: { width: 200, height: 200, resizeMode: 'contain' },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffffff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    elevation: 2,
  },
  codeText: { fontSize: 22, fontWeight: '700', color: '#0056D2' },
  copyButton: { backgroundColor: '#EAF1FF', padding: 8, borderRadius: 50 },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C2A8',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 40,
  },
  shareText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginTop: 30,
    marginBottom: 10,
  },
  referralCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  referralName: { fontSize: 15, fontWeight: '600', color: '#111' },
  referralStatus: { fontSize: 12, color: '#666' },
  referralAmount: { color: '#00C2A8', fontWeight: '700', fontSize: 14 },
  contactSection: { marginTop: 30, backgroundColor: '#F2F6FF', padding: 16, borderRadius: 12 },
  contactTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 6 },
  contactText: { color: '#444', fontSize: 14, marginBottom: 12 },
  contactButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00C2A8',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  contactBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
});
