import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Service {
  id: string;
  title1: string;
  title2: string;
  icon: string;
  color: string;
  screen: keyof RootStackParamList;
}

export default function UtilitiesGrid() {
  const navigation = useNavigation<NavigationProp>();

  const utilities: Service[] = [
    { id: "1", title1: "Mobile", title2: "Recharge", icon: "phone-android", color: "#00C2A8", screen: "Recharge" },
    { id: "2", title1: "Electricity", title2: "Bill", icon: "flash-on", color: "#FFB300", screen: "Electricity" },
    { id: "3", title1: "Water", title2: "Bill", icon: "water-drop", color: "#0077CC", screen: "Water" },
    { id: "4", title1: "Gas", title2: "Cylinder", icon: "local-fire-department", color: "#FF4D4D", screen: "GasBill" },
    { id: "5", title1: "DTH", title2: "Recharge", icon: "satellite", color: "#9C27B0", screen: "DTH" },
    { id: "6", title1: "Broadband", title2: "Bill", icon: "wifi", color: "#00ACC1", screen: "Broadband" },
    { id: "7", title1: "Postpaid", title2: "Bill", icon: "call", color: "#26A69A", screen: "PostpaidBill" },
    { id: "8", title1: "Insurance", title2: "Payment", icon: "verified-user", color: "#1976D2", screen: "InsurancePay" },
  ];

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Mobile Recharge & Utilities</Text>
      <View style={styles.grid}>
        {utilities.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handleNavigate(item.screen)}
          >
            <View style={[styles.iconWrapper, { backgroundColor: `${item.color}20` }]}>
              <Icon name={item.icon} size={32} color={item.color} />
            </View>
            <Text style={styles.titleText}>{item.title1}</Text>
            <Text style={styles.subText}>{item.title2}</Text>
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
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "23%",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowRadius: 2,
  },
  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  subText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
