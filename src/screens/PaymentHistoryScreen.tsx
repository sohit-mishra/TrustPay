import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Payment {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: "Successful" | "Pending" | "Failed";
  type: "credit" | "debit";
}

interface MonthGroup {
  month: string;
  year: number;
  payments: Payment[];
}

const paymentsData: MonthGroup[] = [
  {
    year: 2025,
    month: "November",
    payments: [
      { id: "1", name: "Flick TV", date: "2025-11-01", amount: 2, status: "Successful", type: "debit" },
      { id: "2", name: "Metro Store", date: "2025-11-01", amount: 5, status: "Failed", type: "debit" },
      { id: "3", name: "Sohit Kumar", date: "2025-11-02", amount: 12, status: "Pending", type: "debit" },
      { id: "4", name: "BookMyShow", date: "2025-11-03", amount: 7, status: "Successful", type: "debit" },
      { id: "9", name: "Trust Pay Rewards", date: "2025-11-04", amount: 10, status: "Successful", type: "credit" },
    ],
  },
  {
    year: 2025,
    month: "October",
    payments: [
      { id: "5", name: "Neoastro", date: "2025-10-29", amount: 2, status: "Successful", type: "debit" },
      { id: "6", name: "Kaushal Singh", date: "2025-10-28", amount: 40, status: "Pending", type: "debit" },
      { id: "7", name: "Zerodha", date: "2025-10-27", amount: 1, status: "Successful", type: "debit" },
      { id: "8", name: "Trust Pay Rewards", date: "2025-10-25", amount: 6, status: "Successful", type: "credit" },
    ],
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentHistory'>;

const PaymentHistoryScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Successful" | "Pending" | "Failed">("All");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("All");

  const handlePressHisotryBack = () => {
    navigation.goBack();
  };

  const filteredData = paymentsData
    .filter((group) => selectedMonth === "All" || group.month === selectedMonth)
    .map((group) => ({
      ...group,
      payments: group.payments.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View style={styles.searchContainer}>
        <Icon name="arrow-back" size={24} color="#000" onPress={handlePressHisotryBack} />
        <TextInput
          placeholder="Search transactions"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowStatusModal(true)}>
          <Text style={styles.filterText}>Status: {statusFilter}</Text>
          <Icon name="arrow-drop-down" size={20} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={() => setShowDateModal(true)}>
          <Text style={styles.filterText}>Month: {selectedMonth}</Text>
          <Icon name="arrow-drop-down" size={20} color="#444" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        {filteredData.map((group) => {
          const total = group.payments.reduce((sum, p) => sum + p.amount, 0);
          if (group.payments.length === 0) return null;

          return (
            <View key={group.month} style={{ paddingBottom: 1 }}>
              <View style={styles.monthHeader}>
                <Text style={styles.monthTitle}>
                  {group.month} {group.year}
                </Text>
                <Text style={styles.monthTotal}>₹{total.toFixed(2)}</Text>
              </View>

              {group.payments.map((p) => (
                <TouchableOpacity key={p.id} style={styles.transactionRow}  onPress={() => navigation.navigate('TransactionHistory')}>
                  <View style={[styles.avatar, { backgroundColor: getAvatarColor(p.name) }]}>
                    <Text style={styles.avatarText}>{p.name.charAt(0).toUpperCase()}</Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.name}>{p.name}</Text>
                    <Text style={styles.date}>{formatDate(p.date)}</Text>
                  </View>

                  <View style={styles.amountContainer}>
                    <Text
                      style={[
                        styles.amount,
                        { color: p.type === "credit" ? "#00C853" : "#111" },
                      ]}
                    >
                      {p.type === "credit" ? "+" : "-"}₹{p.amount}
                    </Text>

                    {p.status !== "Successful" && (
                      <View style={styles.statusRow}>
                        <Icon
                          name={p.status === "Pending" ? "hourglass-empty" : "error-outline"}
                          size={14}
                          color={getStatusColor(p.status)}
                          style={{ marginRight: 2 }}
                        />
                        <Text style={[styles.statusText, { color: getStatusColor(p.status) }]}>
                          {p.status}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <Modal visible={showStatusModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowStatusModal(false)}>
          <View style={styles.modalBox}>
            {["All", "Successful", "Pending", "Failed"].map((status) => (
              <TouchableOpacity
                key={status}
                style={styles.modalOption}
                onPress={() => {
                  setStatusFilter(status as any);
                  setShowStatusModal(false);
                }}
              >
                <Text style={styles.modalText}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Modal visible={showDateModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowDateModal(false)}>
          <View style={styles.modalBox}>
            {["All", "November", "October"].map((month) => (
              <TouchableOpacity
                key={month}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedMonth(month);
                  setShowDateModal(false);
                }}
              >
                <Text style={styles.modalText}>{month}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default PaymentHistoryScreen;

const getAvatarColor = (name: string) => {
  const colors = ["#7E57C2", "#FF7043", "#42A5F5", "#26A69A", "#AB47BC"];
  return colors[name.length % colors.length];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Failed":
      return "#D32F2F";
    case "Pending":
      return "#FFA000";
    default:
      return "#00C853";
  }
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FA",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 30,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    height:50,
    color: "#111",
    fontSize: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000000ff",
    marginTop: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffffff",
  },
  monthTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00C2A8",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 8,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    width: 280,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 12,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});
