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

type Props = NativeStackScreenProps<RootStackParamList, "Water">;

export default function WaterScreen({ navigation }: Props) {
  const [board, setBoard] = useState("");
  const [consumerId, setConsumerId] = useState("");

  const handleContinue = () => {
    if (!board || !consumerId) {
      Alert.alert("Missing Info", "Please select water board and enter consumer ID.");
      return;
    }

    navigation.navigate("PaymentAmount");
  };

  const isDisabled = !board || !consumerId;

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={22} color="#111" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Water Bill Payment</Text>
        <View style={{ width: 30 }} />
      </View>

    
      <View style={styles.content}>
        <Text style={styles.label}>Select Water Board</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={board}
            onValueChange={(value) => setBoard(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Water Board" value="" />
            <Picker.Item label="Delhi Jal Board" value="Delhi Jal Board" />
            <Picker.Item label="Bangalore Water Supply and Sewerage Board (BWSSB)" value="BWSSB" />
            <Picker.Item label="Chennai Metro Water" value="Chennai Metro Water" />
            <Picker.Item label="Hyderabad Metropolitan Water Supply & Sewerage Board (HMWSSB)" value="HMWSSB" />
            <Picker.Item label="Pune Municipal Corporation" value="PMC" />
          </Picker>
        </View>

        <Text style={styles.label}>Consumer / Connection ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your consumer ID"
          placeholderTextColor="#aaa"
          value={consumerId}
          onChangeText={setConsumerId}
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
 