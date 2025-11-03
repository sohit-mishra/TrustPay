import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import PaymentScanScreen from '../screens/BillsScreen/PaymentScanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RechargeScreen from '../screens/BillsScreen/RechargeScreen';
import PaymentAmountScreen from '../screens/PaymentAmountScreen';
import QrCodeScreen from '../screens/QrCodeScreen';
import AllBankScreen from '../screens/AllBankScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import CashbackScreen from '../screens/CashbackScreen';
import LanguageScreen from '../screens/LanguageScreen';
import GetHelpScreen from '../screens/GetHelpScreen';
import ReferCodeScreen from '../screens/ReferCodeScreen';
import YourInfoScreen from '../screens/YourInfoScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import CheckBankBalanceScreen from '../screens/CheckBalanceScreen';
import FriendChatAndTransactionChatScreen from '../screens/FriendChatAndTransactionChatScreen';
import BankTransferScreen from '../screens/BillsScreen/BankTransferScreen';
import PayUPIScreen from '../screens/BillsScreen/PayUPIScreen';
import DTHScreen from '../screens/BillsScreen/DTHScreen';
import BroadbandScreen from '../screens/BillsScreen/BroadbandScreen';
import GasScreen from '../screens/BillsScreen/GasScreen';
import WaterScreen from '../screens/BillsScreen/WaterScreen';
import ElectricityScreen from '../screens/BillsScreen/ElectricityScreen';
import InsuranceScreen from '../screens/BillsScreen/InsuranceScreen';
import PostpaidScreen from '../screens/BillsScreen/PostpaidScreen';

export type RootStackParamList = {
  AuthLoading: undefined;
  Login: undefined;
  Otp: { phone: string };
  Home: undefined;
  PaymentHistory: undefined;
  PaymentScan: undefined;
  Profile: undefined;
  Recharge: undefined;
  PaymentAmount: undefined;
  QrCode: undefined;
  AllBank: undefined;
  PaymentMethod: undefined;
  Cashback: undefined;
  Language: undefined;
  GetHelp: undefined;
  ReferCode: undefined;
  YourInfo: undefined;
  TransactionHistory: undefined;
  CheckBankBalance: undefined;
  FriendChatAndTransactionChat: undefined;
  BankTransfer: undefined;
  PayUPI: undefined;
  DTH: undefined;
  Broadband: undefined;
  GasBill: undefined;
  Water: undefined;
  Electricity: undefined;
  PostpaidBill: undefined;
  InsurancePay: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen name="PaymentScan" component={PaymentScanScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Recharge" component={RechargeScreen} />
      <Stack.Screen name="PaymentAmount" component={PaymentAmountScreen} />
      <Stack.Screen name="QrCode" component={QrCodeScreen} />
      <Stack.Screen name='AllBank' component={AllBankScreen} />
      <Stack.Screen name='PaymentMethod' component={PaymentMethodScreen} />
      <Stack.Screen name='Cashback' component={CashbackScreen} />
      <Stack.Screen name='Language' component={LanguageScreen} />
      <Stack.Screen name='GetHelp' component={GetHelpScreen} />
      <Stack.Screen name='ReferCode' component={ReferCodeScreen} />
      <Stack.Screen name='YourInfo' component={YourInfoScreen} />
      <Stack.Screen name='TransactionHistory' component={TransactionHistoryScreen} />
      <Stack.Screen name='CheckBankBalance' component={CheckBankBalanceScreen} />
      <Stack.Screen name='FriendChatAndTransactionChat' component={FriendChatAndTransactionChatScreen} />

      <Stack.Screen name='BankTransfer' component={BankTransferScreen} />
      <Stack.Screen name='PayUPI' component={PayUPIScreen} />
      <Stack.Screen name='DTH' component={DTHScreen} />
      <Stack.Screen name='Broadband' component={BroadbandScreen} />
      <Stack.Screen name='GasBill' component={GasScreen} />
      <Stack.Screen name='Water' component={WaterScreen} />
      <Stack.Screen name='Electricity' component={ElectricityScreen} />
      <Stack.Screen name='PostpaidBill' component={PostpaidScreen} />
      <Stack.Screen name='InsurancePay' component={InsuranceScreen} />
    </Stack.Navigator>
  );
}
