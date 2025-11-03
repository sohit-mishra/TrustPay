import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ServiceGrid from "../components/ServiceGrid";
import SendMoneyGrid from "../components/SendMoneyGrid";
import UtilitiesGrid from "../components/UtilitiesGrid";
import CashbackCard from "../components/CashbackCard";
import TransactionButton from "../components/TransactionButton";
import BottomPoster from "../components/BottomPoster";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />


      <Header onProfilePress={() => navigation.navigate("Profile")} />


      <Banner />


      <ServiceGrid />


      <SendMoneyGrid
        onContactPress={() => navigation.navigate("FriendChatAndTransactionChat")}
      />

      <UtilitiesGrid />


      <CashbackCard />


      <TransactionButton
        onCheckBalance={() => navigation.navigate("CheckBankBalance")}
        onPaymentHistory={() => navigation.navigate("PaymentHistory")}
      />


      <BottomPoster />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  contactCard: {
    width: "22%",
    alignItems: "center",
    marginBottom: 15,
  },

  contactImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },

  contactName: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },

  addMoreCard: {
    width: "22%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF3FF",
    borderRadius: 30,
    paddingVertical: 15,
    marginBottom: 15,
  },

  addMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0077CC",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginTop: 20,
    marginBottom: 10,
  },

  cashbackContainer: {
    backgroundColor: "#E8F8F5",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },

  cashbackText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00C2A8",
  },

  referButton: {
    marginTop: 10,
    backgroundColor: "#00C2A8",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  referText: {
    color: "#fff",
    fontWeight: "700",
  },

  posterContainer: {
    alignItems: "center",
    marginVertical: 30,
  },

  poster: {
    width: 200,
    height: 180,
    borderRadius: 20,
  },

  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
});
