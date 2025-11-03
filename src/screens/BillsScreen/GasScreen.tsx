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

type Props = NativeStackScreenProps<RootStackParamList, "GasBill">;

export default function GasScreen({ navigation }: Props) {
  const [operator, setOperator] = useState("");
  const [customerId, setCustomerId] = useState("");

  const handleContinue = () => {
    if (!operator || !customerId) {
      Alert.alert("Missing Info", "Please select operator and enter customer ID.");
      return;
    }

    navigation.navigate("PaymentAmount");
  };

  const isDisabled = !operator || !customerId;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={22} color="#111" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gas Cylinder Booking</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Select Gas Provider</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={operator}
            onValueChange={(value) => setOperator(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Provider" value="" />
            <Picker.Item label="Indane Gas" value="Indane" />
            <Picker.Item label="Bharat Gas" value="Bharat Gas" />
            <Picker.Item label="HP Gas" value="HP Gas" />
            <Picker.Item label="Super Gas" value="Super Gas" />
            <Picker.Item label="Adani Gas" value="Adani Gas" />
          </Picker>
        </View>

        <Text style={styles.label}>Registered Mobile / Customer ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter registered mobile or customer ID"
          placeholderTextColor="#aaa"
          value={customerId}
          onChangeText={setCustomerId}
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
