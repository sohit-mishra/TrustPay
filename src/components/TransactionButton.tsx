import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  onCheckBalance: () => void;
  onPaymentHistory: () => void;
}

export default function TransactionButton({ onCheckBalance, onPaymentHistory }: Props) {
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity  onPress={onCheckBalance} activeOpacity={0.85} style={styles.wrapper}>
        <LinearGradient
          colors={["#0077CC", "#00B6C5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.iconContainer}>
            <Icon name="account-balance-wallet" size={28} color="#fff" />
          </View>

          <Text style={styles.title}>Check Your Bank Balance Instantly</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPaymentHistory} activeOpacity={0.85} style={styles.wrapper}>
        <LinearGradient
          colors={["#00B6C5", "#00D4FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.iconContainer}>
            <Icon name="history" size={26} color="#fff" />
          </View>

          <Text style={styles.subtitle}>See All Transactions →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 20,
  },
  wrapper: {
    borderRadius: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
  },
  subtitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
