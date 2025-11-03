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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'GetHelp'>;

const GetHelpScreen = ({ navigation }: Props) => {
  const handlePressHistoryBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressHistoryBack}>
          <Icon name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Get Help</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/contact.png')}
          style={styles.contactImage}
        />
      </View>

      <Text style={styles.helpText}>Need Assistance?</Text>
      <Text style={styles.subText}>
        We're here to help you. Choose a method to get in touch with us.
      </Text>

      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.contactCard}>
          <Icon name="email" size={24} color="#00C2A8" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactSubtitle}>support@allbankapp.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <Icon name="chat" size={24} color="#00C2A8" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSubtitle}>Chat with our support team</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handlePressHistoryBack}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetHelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contactImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  helpText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    marginBottom: 30,
  },
  contactContainer: {
    marginBottom: 40,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  contactSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  doneButton: {
    backgroundColor: '#00C2A8',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
