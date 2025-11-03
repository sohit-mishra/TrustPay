import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Icon from "react-native-vector-icons/MaterialIcons";

type PaymentScanScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PaymentScan"
>;

const PaymentScanScreen = () => {
  const navigation = useNavigation<PaymentScanScreenNavigationProp>();

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back-ios" size={22} color="#000000ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Pay</Text>
        <View style={{ width: 40 }} /> 
      </View>

     
      <Text style={styles.centerText}>
        Scan the <Text style={styles.boldText}>Payment QR Code</Text>
      </Text>

     
      <View style={styles.scanBox}>
        <Text style={styles.noCameraText}>Camera Access Not Allowed</Text>
      </View>
    </View>
  );
};

export default PaymentScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  centerText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    marginVertical: 40,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#007BFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    alignSelf: "center",
  },
  noCameraText: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
  },

  inputContainer: {
    width: "100%",
    marginTop: 40,
  },
  labelText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonTouchable: {
    padding: 14,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
