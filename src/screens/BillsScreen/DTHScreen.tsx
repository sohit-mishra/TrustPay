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

type Props = NativeStackScreenProps<RootStackParamList, "DTH">;

export default function DTHScreen({ navigation }: Props) {
  const [operator, setOperator] = useState("");
  const [subscriberNumber, setSubscriberNumber] = useState("");

  const handleContinue = () => {
    if (!operator || !subscriberNumber) {
      Alert.alert("Missing Info", "Please select operator and enter subscriber number.");
      return;
    }
    navigation.navigate("PaymentAmount");
  };

  const isDisabled = !operator || !subscriberNumber;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back-ios" size={22} color="#111" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select DTH Operator</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>DTH Operator</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={operator}
            onValueChange={(value) => setOperator(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Operator" value="" />
            <Picker.Item label="Tata Play (formerly Tata Sky)" value="Tata Play" />
            <Picker.Item label="Airtel Digital TV" value="Airtel Digital TV" />
            <Picker.Item label="Sun Direct" value="Sun Direct" />
            <Picker.Item label="Dish TV / Videocon d2h" value="Dish TV" />
            <Picker.Item label="DD Free Dish" value="DD Free Dish" />
          </Picker>
        </View>

        <Text style={styles.label}>Subscriber / Smart Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your subscriber number"
          placeholderTextColor="#aaa"
          value={subscriberNumber}
          onChangeText={setSubscriberNumber}
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
