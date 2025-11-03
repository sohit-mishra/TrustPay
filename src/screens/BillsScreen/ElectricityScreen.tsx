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

type Props = NativeStackScreenProps<RootStackParamList, "Electricity">;

export default function ElectricityScreen({ navigation }: Props) {
  const [board, setBoard] = useState("");
  const [consumerNumber, setConsumerNumber] = useState("");

  const handleContinue = () => {
    if (!board || !consumerNumber) {
      Alert.alert("Missing Info", "Please select your electricity board and enter consumer number.");
      return;
    }

    navigation.navigate("PaymentAmount");
  };

  const isDisabled = !board || !consumerNumber;

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={22} color="#111" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electricity Bill Payment</Text>
        <View style={{ width: 30 }} />
      </View>

     
      <View style={styles.content}>
        <Text style={styles.label}>Select Electricity Board</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={board}
            onValueChange={(value) => setBoard(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Board" value="" />
            <Picker.Item label="BSES Rajdhani Power Limited (BRPL)" value="BRPL" />
            <Picker.Item label="BSES Yamuna Power Limited (BYPL)" value="BYPL" />
            <Picker.Item label="Tata Power Delhi Distribution Limited (TPDDL)" value="TPDDL" />
            <Picker.Item label="Maharashtra State Electricity Board (MSEB)" value="MSEB" />
            <Picker.Item label="Uttar Pradesh Power Corporation Limited (UPPCL)" value="UPPCL" />
            <Picker.Item label="Tamil Nadu Generation and Distribution Corp (TANGEDCO)" value="TANGEDCO" />
          </Picker>
        </View>

        <Text style={styles.label}>Consumer Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your consumer number"
          placeholderTextColor="#aaa"
          value={consumerNumber}
          onChangeText={setConsumerNumber}
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
