import React, { useState, useEffect } from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "Recharge">;

export default function RechargeScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [operator, setOperator] = useState("");

  useEffect(() => {
    const number = phone.replace(/\D/g, "").slice(-10);
    if (number.startsWith("98") || number.startsWith("97")) {
      setOperator("Airtel");
    } else if (number.startsWith("99") || number.startsWith("96")) {
      setOperator("Jio");
    } else if (number.startsWith("88") || number.startsWith("89")) {
      setOperator("Vi");
    } else if (number.startsWith("94") || number.startsWith("93")) {
      setOperator("BSNL");
    } else {
      setOperator("");
    }
  }, [phone]);

  const handleRecharge = () => {
    if (!phone || !amount) {
      Alert.alert("Missing Info", "Please enter both phone number and amount.");
      return;
    }
    if (!operator) {
      Alert.alert("Select Operator", "Please choose a mobile operator.");
      return;
    }
    navigation.navigate("PaymentAmount");
  };

  const isDisabled = !phone || !amount || !operator;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={22} color="#111" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mobile Recharge</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <Text style={styles.label}>Operator</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={operator}
            onValueChange={(value) => setOperator(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Operator" value="" />
            <Picker.Item label="Airtel" value="Airtel" />
            <Picker.Item label="Jio" value="Jio" />
            <Picker.Item label="Vi" value="Vi" />
            <Picker.Item label="BSNL" value="BSNL" />
          </Picker>
        </View>

        <Text style={styles.label}>Enter Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="₹ Enter amount"
          placeholderTextColor="#aaa"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.continueButton, isDisabled && styles.disabledButton]}
          onPress={handleRecharge}
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
