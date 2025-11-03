import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function BottomPoster() {
  return (
    <View style={styles.posterContainer}>
      <Image source={require("../assets/images/bottomApp.png")} style={styles.poster} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  posterContainer: { alignItems: "center", marginVertical: 30 },
  poster: { width: "100%", height: 180, borderRadius: 20 },
  footerText: { marginTop: 8, fontSize: 14, color: "#555", fontWeight: "500" },
});
