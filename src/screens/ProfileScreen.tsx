import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';


type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const handlePressHistoryBack = () => {
    navigation.goBack();
  };

  const user = {
    name: 'Ananya Sharma',
    email: 'ananya.sharma@trustpayupi',
    avatar: require('../assets/images/profile.jpg'),
  };

  return (
    <LinearGradient colors={['#ffffffff', '#ffffff']} style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePressHistoryBack}>
            <Icon name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 26 }} />
        </View>

        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={() => navigation.navigate('QrCode')}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.editButton}>
              <Icon name="qr-code" size={18} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>


        <LinearGradient
          colors={['#ffffff', '#f8f9fb']}
          style={styles.statsContainer}
        >
          <TouchableOpacity
            style={styles.statItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PaymentHistory')}
          >
            <Icon name="payments" size={22} color="#6b6b6b" />
            <Text style={styles.statValue}>₹2,300</Text>
            <Text style={styles.statLabel}>Total Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PaymentMethod')}
          >
            <Icon name="account-balance" size={22} color="#ff6600" />
            <Text style={styles.statValue}>2 Banks</Text>
            <Text style={styles.statLabel}>Bank Added</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Cashback')}
          >
            <Icon name="redeem" size={22} color="#00C2A8" />
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>Cashbacks</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ReferCode')}>
            <View style={styles.menuIconWrapper}>
              <Icon name="person-outline" size={22} color="#6C63FF" />
            </View>
            <Text style={styles.menuText}>Refer Code</Text>
            <Icon name="chevron-right" size={22} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('QrCode')}
          >
            <View style={styles.menuIconWrapper}>
              <Icon name="qr-code" size={22} color="#6C63FF" />
            </View>
            <Text style={styles.menuText}>QR Code</Text>
            <Icon name="chevron-right" size={22} color="#bbb" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('YourInfo')}>
            <View style={styles.menuIconWrapper}>
              <Icon name="settings" size={22} color="#6C63FF" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Icon name="chevron-right" size={22} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('GetHelp')}>
            <View style={styles.menuIconWrapper}>
              <Icon name="notifications-none" size={22} color="#6C63FF" />
            </View>
            <Text style={styles.menuText}>Get Help</Text>
            <Icon name="chevron-right" size={22} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Language')}>
            <View style={styles.menuIconWrapper}>
              <Icon name="translate" size={22} color="#6C63FF" />
            </View>
            <Text style={styles.menuText}>Language</Text>
            <Icon name="chevron-right" size={22} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => navigation.replace('Login')}
          >
            <View style={styles.menuIconWrapper}>
              <Icon name="logout" size={22} color="#ff4d4d" />
            </View>
            <Text style={[styles.menuText, { color: '#ff4d4d' }]}>Logout</Text>
            <Icon name="chevron-right" size={22} color="#ffb3b3" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    padding: 6,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f3f3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
    marginLeft: 12,
  },
  logoutItem: {
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#f5f5f5',
  },
});
