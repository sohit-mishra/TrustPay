import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    ToastAndroid,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

type Props = NativeStackScreenProps<RootStackParamList, 'QrCode'>;

export default function QrCodeScreen({ navigation }: Props) {
    const handleBack = () => navigation.goBack();

    const user = {
        name: 'Ananya Sharma',
        bank: 'HDFC Bank 5842',
        upi: 'ananya.sharma@trustpayupi',
        avatar: require('../assets/images/profile.jpg'),
        qrImage: require('../assets/images/qr_code.png'),
    };

 
    const handleCopyUPI = () => {
        Clipboard.setString(user.upi);
        ToastAndroid.show('UPI ID copied to clipboard', ToastAndroid.SHORT);
    };

   
    const handleShareQR = async () => {
        try {
            const image = Image.resolveAssetSource(user.qrImage);
            const destPath = `${RNFS.DocumentDirectoryPath}/qr_code.png`;

           
            await RNFS.copyFile(image.uri.replace('file://', ''), destPath);

            const shareOptions = {
                title: 'Share QR Code',
                message: `Send money to ${user.name}\nUPI ID: ${user.upi}`,
                url: 'file://' + destPath,
                type: 'image/png',
            };

            await Share.open(shareOptions);
        } catch (err) {
            console.log('Share error', err);
            ToastAndroid.show('Failed to share QR code', ToastAndroid.SHORT);
        }
    };

   
    const handleDownloadQR = async () => {
        try {
            
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message:
                            'App needs access to your storage to download the QR code image.',
                        buttonPositive: 'OK',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
                    return;
                }
            }

            const image = Image.resolveAssetSource(user.qrImage);
            const sourcePath = image.uri.replace('file://', '');
            const destPath = `${RNFS.DownloadDirectoryPath}/qr_code.png`;

            await RNFS.copyFile(sourcePath, destPath);
            ToastAndroid.show('QR code saved to Downloads folder', ToastAndroid.LONG);
        } catch (error) {
            console.log('Download error:', error);
            ToastAndroid.show('Failed to save QR code', ToastAndroid.SHORT);
        }
    };

   
    const handleOpenScanner = () => {
        navigation.navigate('PaymentScan');
    };

    return (
        <LinearGradient colors={['#f6f9ff', '#ffffff']} style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
             
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                        <Icon name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton} onPress={handleDownloadQR}>
                            <Icon name="file-download" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleShareQR}>
                            <Icon name="share" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

              
                <View style={styles.card}>
                    <View style={styles.profileRow}>
                        <Image source={user.avatar} style={styles.avatar} />
                        <Text style={styles.name}>{user.name}</Text>
                    </View>

                    <Image source={user.qrImage} style={styles.qrCode} />

                    <Text style={styles.scanText}>Scan to pay with any UPI app</Text>

                    <View style={styles.bankRow}>
                        <Image
                            source={require('../assets/images/hdfc.png')}
                            style={styles.bankIcon}
                        />
                        <Text style={styles.bankText}>{user.bank}</Text>
                    </View>

                    <TouchableOpacity onPress={handleCopyUPI} style={styles.upiRow}>
                        <Text style={styles.upiText}>UPI ID: {user.upi}</Text>
                        <Icon name="content-copy" size={18} color="#555" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>
                </View>

             
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionBtn} onPress={handleOpenScanner}>
                        <Icon name="qr-code-scanner" size={22} color="#0056D2" />
                        <Text style={styles.actionText}>Open scanner</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBtn, { marginLeft: 16 }]}
                        onPress={handleShareQR}
                    >
                        <Icon name="share" size={20} color="#0056D2" />
                        <Text style={styles.actionText}>Share QR code</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>
                    Powered by <Text style={styles.upiBold}>UPI</Text>
                </Text>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 12,
    },
    card: {
        width: '90%',
        backgroundColor: '#f7f9ff',
        borderRadius: 18,
        alignItems: 'center',
        paddingVertical: 25,
        marginTop: 30,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: '#111',
    },
    qrCode: {
        width: 200,
        height: 200,
        marginVertical: 15,
    },
    scanText: {
        fontSize: 13,
        color: '#666',
        marginTop: 5,
    },
    bankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    bankIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
        resizeMode: 'contain',
    },
    bankText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
    upiRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    upiText: {
        fontSize: 13,
        color: '#444',
        marginTop: 6,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0056D2',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },
    actionText: {
        color: '#0056D2',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
    footerText: {
        fontSize: 12,
        color: '#888',
        marginTop: 25,
        marginBottom: 40,
    },
    upiBold: {
        fontWeight: '700',
        color: '#111',
    },
});
