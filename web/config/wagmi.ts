import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Celengan Web3',
  projectId: 'YOUR_PROJECT_ID', // Masuk ke cloud.walletconnect.com buat dapet ID (Gratis), atau isi 'TEST' dulu gpp
  chains: [hardhat], // <--- PENTING: Kita pake jaringan Hardhat (Localhost)
  ssr: true, // Server Side Rendering aman
});