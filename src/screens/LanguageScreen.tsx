import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;

const LanguageScreen = ({ navigation }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const handlePressHistoryBack = () => navigation.goBack();
  const handleSelect = (lang: string) => setSelectedLanguage(lang);
  const handleDone = () => {
    console.log('Language Selected:', selectedLanguage);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressHistoryBack}>
          <Icon name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Language</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.list}>
        {['English', 'Hindi', 'Bengali'].map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.langItem,
              selectedLanguage === lang && styles.langItemSelected,
            ]}
            onPress={() => handleSelect(lang)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.langText,
                selectedLanguage === lang && styles.langTextSelected,
              ]}
            >
              {lang}
            </Text>
            {selectedLanguage === lang && (
              <Icon name="check-circle" size={24} color="#00C2A8" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageScreen;

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
  list: {
    marginTop: 20,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  langItemSelected: {
    backgroundColor: '#ebeaeaff',
  },
  langText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  langTextSelected: {
    color: '#00C2A8',
    fontWeight: '700',
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
