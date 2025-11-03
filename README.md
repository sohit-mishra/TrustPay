# 🛡️ TrustPay

**TrustPay** is a secure and fast **digital payment app** built using **React Native CLI**.  
It allows users to manage UPI payments, mobile recharges, utility bills, and bank transfers — all within a single, beautifully designed interface.  
With **fingerprint authentication** and **OTP-based login**, TrustPay ensures your transactions stay safe and simple.

---

## 🔗 Project Repository

> **GitHub Repository:** [https://github.com/sohit-mishra/trustpay](https://github.com/sohit-mishra/trustpay)

---

## ⚙️ Tech Stack

- ⚛️ **React Native CLI**  
- 💡 **TypeScript**  
- 🧭 **React Navigation (Native Stack)**  
- 🔐 **Fingerprint Authentication** (`react-native-fingerprint-scanner` or similar)  
- 💾 **AsyncStorage / SecureStore** for secure local data  
- 🧩 Modular, screen-based architecture  

---

## 📸 Screenshots

| Home | Login | OTP | QR Code |
|------|-------|-----|----------|
| ![Home](/screenshots/home.jpg) | ![Login](/screenshots/login.jpg) | ![OTP](/screenshots/Otp.jpg) | ![QR Code](/screenshots/qrcode.jpg) |

| Scan & Pay | Bank Transfer | Add Bank | Added Bank |
|-------------|----------------|-----------|-------------|
| ![ScanPay](/screenshots/scanpay.jpg) | ![BankTransfer](/screenshots/banktransfer.jpg) | ![AddBank](/screenshots/AddBank.jpg) | ![AddedBank](/screenshots/AddedBank.jpg) |

| All Transactions | Bank Balance | Mobile Recharge | Bill Payment |
|------------------|--------------|------------------|---------------|
| ![AllTransactions](/screenshots/alltranasction.jpg) | ![BankBalance](/screenshots/bankbalance.jpg) | ![Mobile](/screenshots/mobile.jpg) | ![Bill](/screenshots/bill.jpg) |

| Payment Amount | Cashback | Coupons | Friend Pay |
|----------------|-----------|----------|-------------|
| ![PaymentAmount](/screenshots/PaymentAmount.jpg) | ![Cashback](/screenshots/CashbackMoney.jpg) | ![Coupon](/screenshots/Coupon.jpg) | ![FriendPay](/screenshots/FriendPay.jpg) |

| Pending Rewards | Refer Page | Support | Profile |
|-----------------|-------------|----------|----------|
| ![PendingReward](/screenshots/PendingReward.jpg) | ![ReferPage](/screenshots/referpage.jpg) | ![Support](/screenshots/support.jpg) | ![Profile](/screenshots/profile.jpg) |

| Update Profile | Language |
|----------------|-----------|
| ![ProfileUpdate](/screenshots/ProfileUpdate.jpg) | ![Language](/screenshots/language.jpg) |

> All screenshots are stored in `/screenshots/`.  
> You can replace them or update their names if necessary.

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sohit-mishra/trustpay.git
cd trustpay
```

### 2️⃣ Install Dependencies

Using **npm**:
```bash
npm install
```

Or using **Yarn**:
```bash
yarn install
```

### 3️⃣ iOS Setup (Mac Only)

Run the following commands to install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

### 4️⃣ Run the App

#### ▶️ For Android
```bash
npx react-native run-android
```

#### 🍎 For iOS
```bash
npx react-native run-ios
```

---

## 💡 Notes

- Ensure your emulator or device is connected before running the app.  
- For iOS, make sure Xcode and CocoaPods are properly configured.  

---

## 📜 License

This project is licensed under the **MIT License**.
