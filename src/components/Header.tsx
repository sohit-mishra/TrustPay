import React from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface HeaderProps {
  onProfilePress: () => void;
}

export default function Header({ onProfilePress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={22} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search TrustPay..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={require("../assets/images/profile.jpg")}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 12,
    marginRight: 10,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
