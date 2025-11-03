import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ReferCode">;

export default function CashbackCard() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <LinearGradient
      colors={["#00C2A8", "#00D4FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <View style={styles.content}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>🎁 Earn ₹250 Cashback</Text>
          <Text style={styles.subtitle}>Invite your friends and get rewarded!</Text>
        </View>

        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/7432/7432206.png",
          }}
          style={styles.image}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ReferCode")}
      >
        <Text style={styles.buttonText}>Refer Now</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 18,
    padding: 16,
    marginVertical: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#f0f0f0",
  },
  image: {
    width: 60,
    height: 60,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    color: "#00B6C5",
    fontSize: 15,
  },
});
