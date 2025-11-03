import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ServiceGrid() {
  const navigation = useNavigation<NavigationProp>();

  const services = [
    {
      id: "1",
      name1: "Mobile",
      name2: "Recharge",
      icon: "phone-android",
      color: "#00C2A8",
      screen: "Recharge",
    },
    {
      id: "2",
      name1: "Bank",
      name2: "Transfer",
      icon: "account-balance",
      color: "#0077CC",
      screen: "BankTransfer",
    },
    {
      id: "3",
      name1: "Scan &",
      name2: "Pay",
      icon: "qr-code-scanner",
      color: "#FF9900",
      screen: "PaymentScan",
    },
    {
      id: "4",
      name1: "Pay",
      name2: "UPI ID",
      icon: "account-balance-wallet",
      color: "#6C63FF",
      screen: "PayUPI",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Popular Services</Text>
      <View style={styles.grid}>
        {services.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.serviceCard}
            activeOpacity={0.8}
           onPress={() => navigation.navigate(item.screen as never)}
          >
            <Icon name={item.icon} size={32} color={item.color} />
            <Text style={styles.serviceText}>{item.name1}</Text>
            <Text style={styles.serviceSubText}>{item.name2}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "23%",
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginTop: 6,
  },
  serviceSubText: {
    fontSize: 13,
    color: "#666",
  },
});
