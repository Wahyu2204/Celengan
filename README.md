# 🐷 Celengan Web3 - Decentralized Savings dApp

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22-yellow)
![Solidity](https://img.shields.io/badge/Solidity-0.8-gray)

**Celengan Web3** adalah aplikasi DeFi sederhana yang memungkinkan pengguna untuk menabung Ethereum (ETH) dengan mekanisme **Time Lock** (Penguncian Waktu). Pengguna tidak dapat menarik dana mereka sebelum batas waktu yang ditentukan berakhir.

Project ini dibuat sebagai studi kasus penerapan **Fullstack Web3 Development** menggunakan Next.js untuk Frontend dan Hardhat untuk Smart Contract.

![Screenshot Dashboard](./screenshots/app-preview.png)
*(Tampilan Dashboard Aplikasi)*

## 🚀 Fitur Utama

- **💰 Nabung (Deposit):** Pengguna dapat menyetor ETH ke dalam smart contract.
- **⏳ Time Lock:** Dana dikunci selama durasi tertentu (misal: 10 detik, 1 jam, dll) untuk melatih kedisiplinan menabung.
- **💸 Tarik Tunai (Withdraw):** Penarikan hanya bisa dilakukan setelah waktu kunci habis.
- **🔐 Connect Wallet:** Integrasi penuh dengan MetaMask menggunakan RainbowKit & Wagmi.
- **⚡ Real-time Updates:** Saldo dan status waktu diperbarui otomatis tanpa refresh halaman.
- **🎨 Modern UI:** Tampilan Dark Mode premium dengan Glassmorphism effect.

## 🛠️ Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Web3 Libraries:** Wagmi, Viem, RainbowKit, TanStack Query

**Backend (Blockchain):**
- **Framework:** Hardhat
- **Language:** Solidity (Smart Contract), TypeScript (Testing/Scripts)
- **Deployment:** Hardhat Ignition
- **Network:** Hardhat Local Node (Localhost)

## 📂 Struktur Project (Monorepo)

```bash
coba-defi/
├── blockchain/         # 🟢 Backend: Smart Contract & Deployment Scripts
│   ├── contracts/      # File .sol (Celengan.sol)
│   └── ignition/       # Script deploy
│
└── web/                # 🔵 Frontend: Next.js Application
    ├── app/            # Halaman & Layout
    ├── components/     # UI Components (Navbar, Buttons)
    ├── config/         # Settingan Wagmi & RainbowKit
    └── constants/      # ABI & Contract Address
```

## 🏃‍♂️ Cara Menjalankan Project (Localhost)

Ikuti langkah ini untuk menjalankan aplikasi di komputer lokal.

##  1. Clone Repository
```bash

git clone [https://github.com/username-kamu/nama-repo.git](https://github.com/username-kamu/nama-repo.git)
cd coba-defi

2. Setup Backend (Blockchain)

Buka terminal baru, masuk ke folder blockchain:
Bash

cd blockchain
npm install

Nyalakan jaringan blockchain lokal (Jangan tutup terminal ini):
Bash

npx hardhat node

Buka terminal baru (split), lalu deploy contract:
Bash

npx hardhat ignition deploy ./ignition/modules/Celengan.ts --network localhost

    ⚠️ PENTING: Salin alamat contract yang muncul (contoh: 0xe7f...) untuk langkah selanjutnya.

3. Setup Frontend

Buka terminal baru, masuk ke folder web:
Bash

cd web
npm install

Update alamat contract:

    Buka file web/constants/index.ts.

    Ganti CELENGAN_ADDRESS dengan alamat yang tadi disalin.

Jalankan website:
Bash

npm run dev

Buka browser di http://localhost:3000.
🦊 Setup MetaMask (Penting!)

Karena berjalan di Localhost, kamu perlu setting MetaMask agar memiliki saldo ETH mainan:

    Ambil Private Key: Lihat terminal npx hardhat node, copy Private Key dari Account #0.

    Import Akun: Di MetaMask, klik Profil -> Import Account -> Paste Private Key.

    Tambah Jaringan Localhost:

        Network Name: Localhost 8545

        RPC URL: http://127.0.0.1:8545

        Chain ID: 31337

        Symbol: ETH

Sekarang kamu punya 10.000 ETH untuk testing! 🎉
🔮 Roadmap / To-Do

    [x] Deploy ke Localhost

    [x] Basic UI/UX (Dark Mode)

    [ ] Deploy ke Public Testnet (Sepolia/Base Sepolia)

    [ ] Tambah fitur Bunga (Yield) sederhana

    [ ] Tambah support Token ERC-20 (USDT/USDC)

🤝 Author

Dibuat oleh [Nama Kamu]. Mahasiswa Teknik Informatika yang sedang mendalami Web3 Development.


---

### ✅ Checklist Terakhir Sebelum Push:

1.  **Ganti Nama:** Cari `[Nama Kamu]` dan `[username-kamu]` di teks di atas, ganti jadi nama asli/GitHub lu.
2.  **Screenshot:**
    * Buat folder baru bernama `screenshots` di dalam folder utama `coba-defi`.
    * Masukin gambar screenshot web lu, kasih nama `app-preview.png`.
3.  **Save & Push!** 🚀