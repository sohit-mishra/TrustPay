import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "InsurancePay">;

export default function InsuranceScreen({ navigation }: Props) {
  const [provider, setProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");

  const handleContinue = () => {
    if (!provider || !policyNumber) {
      Alert.alert("Missing Info", "Please select an insurance provider and enter policy number.");
      return;
    }

    navigation.navigate("PaymentAmount");
  };

  const isDisabled = !provider || !policyNumber;

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={22} color="#111" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance Premium Payment</Text>
        <View style={{ width: 30 }} />
      </View>

   
      <View style={styles.content}>
        <Text style={styles.label}>Select Insurance Provider</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={provider}
            onValueChange={(value) => setProvider(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Provider" value="" />
            <Picker.Item label="LIC (Life Insurance Corporation)" value="LIC" />
            <Picker.Item label="HDFC Life Insurance" value="HDFC Life" />
            <Picker.Item label="ICICI Prudential Life Insurance" value="ICICI Prudential" />
            <Picker.Item label="SBI Life Insurance" value="SBI Life" />
            <Picker.Item label="Max Life Insurance" value="Max Life" />
            <Picker.Item label="Bajaj Allianz Life Insurance" value="Bajaj Allianz" />
          </Picker>
        </View>

        <Text style={styles.label}>Policy Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your policy number"
          placeholderTextColor="#aaa"
          value={policyNumber}
          onChangeText={setPolicyNumber}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.continueButton, isDisabled && styles.disabledButton]}
          onPress={handleContinue}
          disabled={isDisabled}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: -8,
  },
  backIcon: {
    marginLeft: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
    marginBottom: 6,
  },
  pickerWrapper: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  picker: {
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#111",
    paddingVertical: 10,
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: "#00C2A8",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#b2dfdb",
  },
  continueText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
