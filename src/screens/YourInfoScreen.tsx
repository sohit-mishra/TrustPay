import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'YourInfo'>;

const YourInfoScreen = ({ navigation }: Props) => {
 
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    gender: 'Male',
    address: '123 Main St, Springfield, USA',
    age: '29',
    birthday: '1996-04-12',
  });

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const handlePressHistoryBack = () => navigation.goBack();

  const handleDone = () => {
    console.log('Updated Profile:', profile);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

     
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressHistoryBack}>
          <Icon name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Update Setting</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
     
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/profile.jpg')}
            style={styles.profileImage}
          />
        </View>

      
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={profile.email}
            onChangeText={(text) => handleChange('email', text)}
          />

          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={profile.gender}
            onChangeText={(text) => handleChange('gender', text)}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={profile.address}
            onChangeText={(text) => handleChange('address', text)}
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={profile.age}
            onChangeText={(text) => handleChange('age', text)}
          />

          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.input}
            value={profile.birthday}
            placeholder="YYYY-MM-DD"
            onChangeText={(text) => handleChange('birthday', text)}
          />
        </View>
      </ScrollView>

     
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default YourInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#00C2A8',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    color: '#111',
  },
  doneButton: {
    backgroundColor: '#00C2A8',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
