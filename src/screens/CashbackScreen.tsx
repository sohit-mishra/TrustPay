import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    FlatList,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Cashback'>;

type RewardItem = {
    id: string;
    title: string;
    amount?: number;
    code?: string;
    color: string;
};

type CouponItem = {
    id: string;
    title: string;
    code: string;
    unlocked: boolean;
};

export default function CashbackScreen({ navigation }: Props) {
    const [activeTab, setActiveTab] = useState<'pending' | 'money' | 'coupons'>('pending');
    const [modalVisible, setModalVisible] = useState(false);
    const [revealedReward, setRevealedReward] = useState<RewardItem | null>(null);

    const [pendingRewards, setPendingRewards] = useState<RewardItem[]>([
        { id: '1', title: '₹50 Cashback', amount: 50, color: '#FFB6C1' },
        { id: '2', title: '₹25 Cashback', amount: 25, color: '#87CEFA' },
        { id: '3', title: '₹100 Cashback', amount: 100, color: '#FFD580' },
        { id: '4', title: '₹75 Cashback', amount: 75, color: '#C1E1C1' },
        { id: '5', title: '₹50 Off on FASTag', code: 'TAG50', color: '#F9D5E5' },
        { id: '6', title: 'Flat 5% Cashback on UPI', code: 'UPI5', color: '#C1E1C1' },
        { id: '7', title: '20% Off on Bill Payment', code: 'BILL20', color: '#C1E1C1' },
    ]);

    const [earnedRewards, setEarnedRewards] = useState<{ id: string; amount: number }[]>([]);
    const [cashbackTotal, setCashbackTotal] = useState(542.75);

    const [coupons, setCoupons] = useState<CouponItem[]>([
        { id: '1', title: '10% Off on Recharge', code: 'RECH10', unlocked: true },
        { id: '2', title: '₹50 Off on FASTag', code: 'TAG50', unlocked: false },
        { id: '3', title: 'Flat 5% Cashback on UPI', code: 'UPI5', unlocked: false },
        { id: '4', title: '20% Off on Bill Payment', code: 'BILL20', unlocked: false },
    ]);

    const handleBack = () => navigation.goBack();

    const handleScratch = (item: RewardItem) => {
        setRevealedReward(item);
        setModalVisible(true);

        setTimeout(() => {
            setModalVisible(false);
            setPendingRewards((prev) => prev.filter((r) => r.id !== item.id));

            if (item.amount) {
                setEarnedRewards((prev) => [...prev, { id: item.id, amount: item.amount! }]);
                setCashbackTotal((prev) => prev + item.amount!);
                setActiveTab('money');
            } else {
                setCoupons((prev) =>
                    prev.map((c) => (c.code === item.code ? { ...c, unlocked: true } : c))
                );
                setActiveTab('coupons');
            }

            setRevealedReward(null);
        }, 5000);
    };

    const renderReward = ({ item }: { item: RewardItem }) => (
        <TouchableOpacity
            style={[styles.squareCard, { backgroundColor: item.color }]}
            activeOpacity={0.8}
            onPress={() => handleScratch(item)}
        >
            <Text style={styles.cardTitle}>🎁 Scratch Me</Text>
        </TouchableOpacity>
    );

    const renderEarned = ({ item }: { item: { id: string; amount: number } }) => (
        <View style={[styles.squareCard, { backgroundColor: '#E8FFF7' }]}>
            <Icon name="paid" size={28} color="#00C2A8" />
            <Text style={[styles.cardTitle, { color: '#00C2A8', fontSize: 14 }]}>
                ₹{item.amount} Cashback
            </Text>
        </View>
    );

    const renderCoupon = ({ item }: { item: CouponItem }) => (
        <View
            style={[
                styles.squareCard,
                {
                    backgroundColor: '#fff',
                    opacity: item.unlocked ? 1 : 0.5,
                    borderStyle: item.unlocked ? 'solid' : 'dashed',
                    borderColor: '#ccc',
                    borderWidth: 1,
                },
            ]}
        >
            <Text style={styles.couponTitle}>{item.title}</Text>
            <Text style={styles.couponCode}>Code: {item.code}</Text>
            {item.unlocked ? (
                <TouchableOpacity style={styles.useBtn}>
                    <Text style={styles.useBtnText}>Use</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.lockedText}>🔒 Locked</Text>
            )}
        </View>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'pending':
                return (
                    <FlatList
                        data={pendingRewards}
                        keyExtractor={(item) => item.id}
                        renderItem={renderReward}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 60 }}
                    />
                );
            case 'money':
                return (
                    <FlatList
                        data={earnedRewards}
                        keyExtractor={(item) => item.id}
                        renderItem={renderEarned}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 60 }}
                    />
                );
            case 'coupons':
                return (
                    <FlatList
                        data={coupons}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCoupon}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 60 }}
                    />
                );
        }
    };

    return (
        <LinearGradient colors={['#f6f9ff', '#00C2A8']} style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cashbacks</Text>
                <View style={{ width: 26 }} />
            </View>

            <View style={styles.rewardHeader}>
                <Image source={require('../assets/images/reward.png')} style={styles.rewardImage} />
                <Text style={styles.totalText}>₹{cashbackTotal.toFixed(2)}</Text>
                <Text style={styles.subText}>Total Cashback Earned</Text>
            </View>

            <View style={styles.tabRow}>
                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === 'pending' && styles.activeTab]}
                    onPress={() => setActiveTab('pending')}
                >
                    <Text style={[styles.tabText, activeTab === 'pending' && styles.activeText]}>
                        Pending
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === 'money' && styles.activeTab]}
                    onPress={() => setActiveTab('money')}
                >
                    <Text style={[styles.tabText, activeTab === 'money' && styles.activeText]}>
                        Cashback Money
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === 'coupons' && styles.activeTab]}
                    onPress={() => setActiveTab('coupons')}
                >
                    <Text style={[styles.tabText, activeTab === 'coupons' && styles.activeText]}>
                        Coupons
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>{renderContent()}</View>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSquare}>
                        {revealedReward ? (
                            <>
                                <Text style={styles.modalTitle}>🎉 Congratulations!</Text>
                                {revealedReward.amount ? (
                                    <>
                                        <Text style={styles.revealText}>
                                            You won ₹{revealedReward.amount} Cashback 💰
                                        </Text>
                                        <Text style={styles.modalSubText}>
                                            Send Money on Amount
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.revealText}>
                                            You unlocked a coupon: {revealedReward.title} 🎟️
                                        </Text>
                                        <Text style={styles.modalSubText}>
                                            Coupon Unlocked Successfully
                                        </Text>
                                    </>
                                )}
                            </>
                        ) : (
                            <Text style={styles.modalTitle}>Scratching...</Text>
                        )}
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    headerTitle: { fontSize: 18, fontWeight: '600', color: '#111' },
    rewardHeader: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 3,
        marginBottom: 20,
    },
    rewardImage: { width: 250, height: 120, resizeMode: 'contain', marginBottom: 10 },
    totalText: { fontSize: 28, fontWeight: '700', color: '#00C2A8' },
    subText: { fontSize: 13, color: '#777', marginTop: 4 },
    tabRow: { flexDirection: 'row', borderRadius: 50, marginBottom: 10 },
    tabBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
    activeTab: { backgroundColor: '#0056D2' },
    tabText: { fontSize: 13, color: '#333', fontWeight: '600' },
    activeText: { color: '#fff' },
    squareCard: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 3,
    },
    cardTitle: { fontSize: 15, fontWeight: '700', color: '#111', textAlign: 'center' },
    couponTitle: { fontSize: 14, fontWeight: '600', color: '#111', textAlign: 'center' },
    couponCode: { fontSize: 12, color: '#666', marginTop: 4 },
    useBtn: { backgroundColor: '#0056D2', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 16 },
    useBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
    lockedText: { fontSize: 13, color: '#999', fontStyle: 'italic' },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#777' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalSquare: {
        backgroundColor: '#fff',
        width: 250,
        height: 250,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
    revealText: { marginTop: 12, fontSize: 16, color: '#00C2A8', fontWeight: '700', textAlign: 'center' },
    modalSubText: { color: '#666', marginTop: 10, fontSize: 13 },
    modalBankText: { color: '#00C2A8', marginTop: 5, fontSize: 14, fontWeight: '600' },
});
