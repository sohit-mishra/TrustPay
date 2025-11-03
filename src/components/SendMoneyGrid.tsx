import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Contact {
  id: string;
  name: string;
  image: any;
}

interface SendMoneyGridProps {
  onContactPress: (contact: Contact) => void;
}

export default function SendMoneyGrid({ onContactPress }: SendMoneyGridProps) {
  const contacts: Contact[] = [
    { id: "1", name: "Amit", image: require("../assets/user/1.jpg") },
    { id: "2", name: "Priya", image: require("../assets/user/2.jpg") },
    { id: "3", name: "Rohit", image: require("../assets/user/3.jpg") },
    { id: "4", name: "Neha", image: require("../assets/user/4.jpg") },
    { id: "5", name: "Karan", image: require("../assets/user/5.jpg") },
    { id: "6", name: "Sneha", image: require("../assets/user/6.jpg") },
    { id: "7", name: "Arjun", image: require("../assets/user/7.jpg") },
    { id: "8", name: "Pooja", image: require("../assets/user/8.jpg") },
    { id: "9", name: "Rahul", image: require("../assets/user/9.jpg") },
    { id: "10", name: "Divya", image: require("../assets/user/10.jpg") },
    { id: "11", name: "Sameer", image: require("../assets/user/11.jpg") },
    { id: "12", name: "Riya", image: require("../assets/user/12.jpg") },
    { id: "14", name: "Sonia", image: require("../assets/user/14.jpg") },
    { id: "15", name: "Deepak", image: require("../assets/user/15.jpg") },
    { id: "16", name: "Aarti", image: require("../assets/user/16.jpg") },
  ];

  const [visibleContacts, setVisibleContacts] = useState<Contact[]>(
    contacts.slice(0, 12)
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Send Money to Contacts</Text>
      <View style={styles.contactGrid}>
        {visibleContacts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.contactCard}
            activeOpacity={0.8}
            onPress={() => onContactPress(item)}
          >
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.contactImage} />
            </View>
            <Text numberOfLines={1} style={styles.contactName}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}

        {visibleContacts.length < contacts.length && (
          <TouchableOpacity
            style={[styles.contactCard, styles.addMoreCard]}
            onPress={() => setVisibleContacts(contacts)}
            activeOpacity={0.8}
          >
            <View style={styles.addIconWrapper}>
              <Icon name="add" size={32} color="#0077CC" />
            </View>
            <Text style={styles.addMoreText}>More</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginTop: 20,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  contactCard: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    width: 65,
    height: 65,
    borderRadius: 33,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  contactImage: {
    width: "100%",
    height: "100%",
    borderRadius: 33,
  },
  contactName: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 6,
    width: 70,
  },
  addMoreCard: {
    backgroundColor: "transparent",
  },
  addIconWrapper: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#EAF3FF",
    justifyContent: "center",
    alignItems: "center",
  },
  addMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0077CC",
    marginTop: 6,
  },
});
