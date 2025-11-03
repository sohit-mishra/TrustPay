import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Banner() {
    return (
        <View style={styles.bannerContainer}>
            <Image
                source={require("../assets/images/onlinepay.png")}
                style={styles.bannerImage}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({

    bannerContainer: {
        width: "100%",
        height: 200,
        marginVertical: 10,
        borderRadius: 15,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffffff",
    },

    bannerImage: {
        width: 150,
        height: 200,
        borderRadius: 15,
    },
});
