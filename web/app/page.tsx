"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther, formatEther } from "viem";
import { CELENGAN_ADDRESS, CELENGAN_ABI } from "../constants";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [lockTime, setLockTime] = useState("60");

  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const {
    data: saldoData,
    refetch: refetchSaldo,
    isLoading: isLoadingSaldo,
  } = useReadContract({
    address: CELENGAN_ADDRESS,
    abi: CELENGAN_ABI,
    functionName: "saldo",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  const { data: deadlineData } = useReadContract({
    address: CELENGAN_ADDRESS,
    abi: CELENGAN_ABI,
    functionName: "deadline",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  // --- Logic Nabung & Tarik ---
  const handleNabung = () => {
    if (!amount) return;
    writeContract(
      {
        address: CELENGAN_ADDRESS,
        abi: CELENGAN_ABI,
        functionName: "nabung",
        args: [BigInt(lockTime)],
        value: parseEther(amount),
      },
      {
        onSuccess: () => {
          alert("✅ Berhasil Nabung!");
          setAmount("");
          refetchSaldo();
        },
        onError: (err) => alert(err.message),
      }
    );
  };

  const handleWithdraw = () => {
    writeContract(
      {
        address: CELENGAN_ADDRESS,
        abi: CELENGAN_ABI,
        functionName: "ambilDuit",
        args: [],
      },
      {
        onSuccess: () => {
          alert("🎉 Celengan Pecah!");
          refetchSaldo();
        },
      }
    );
  };

  // --- Logic Countdown ---
  const [timeLeft, setTimeLeft] = useState<number>(0);
  useEffect(() => {
    if (!deadlineData) return;
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const dead = Number(deadlineData);
      const sisa = dead - now;
      setTimeLeft(sisa > 0 ? sisa : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [deadlineData]);

  // --- RENDER UI PREMIUM ---
  return (
    <main className="min-h-screen bg-slate-950/20 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>

      {/* Header */}
      <div className="text-center mb-10 z-10">
        <div className="inline-block p-3 rounded-2xl bg-slate-900/50 border border-slate-800 mb-4 backdrop-blur-sm">
          <span className="text-3xl">🐷</span>
        </div>
        <h1 className="text-5xl font-sans font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Your Favorit Crypto Wallet
        </h1>
        <p className="text-slate-400 font-sans font-medium">
          Explore Ethereum with the best wallet for iOS. Interacting with crypto has never been so simple.
        </p>
      </div>

      {/* Main Content */}
      {!isConnected ? (
        <div className="text-center shadow-2xl backdrop-blur-md w-fit mx-auto">
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
              onClick={openConnectModal}
              type="button"
              className="group flex h-10 w-fit items-center justify-center rounded-sm bg-slate-800 border border-slate-700 hover:bg-purple-600 hover:border-purple-500 transition-all duration-200 shadow-lg px-4 gap-2"
              title="Connect Wallet"
            >
              {/* Icon Wallet (SVG) */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="15" 
                height="15" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-slate-300 group-hover:text-white"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>

              <span className="text-sm font-bold text-slate-300 group-hover:text-white">
                Connect Wallet
              </span>
            </button>
            )}
          </ConnectButton.Custom>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
          {/* CARD 1: SALDO */}
          <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between h-full relative group hover:border-purple-500/50 transition-all duration-300">
            <div>
              <h3 className="text-slate-400 font-medium mb-1 tracking-wider text-sm">
                TOTAL TABUNGAN
              </h3>
              <div className="text-5xl font-bold text-white tracking-tight flex items-baseline gap-2">
                {isLoadingSaldo ? (
                  <span className="animate-pulse bg-slate-700 h-12 w-32 rounded-lg block"></span>
                ) : (
                  <>
                    {saldoData ? formatEther(saldoData as bigint) : "0"}
                    <span className="text-2xl text-purple-400">ETH</span>
                  </>
                )}
              </div>
            </div>

            <div
              className={`mt-8 p-4 rounded-xl border flex items-center gap-3 ${timeLeft > 0
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-green-500/10 border-green-500/20 text-green-400"
                }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${timeLeft > 0 ? "bg-red-500" : "bg-green-500"
                  } animate-ping`}
              ></div>
              <span className="font-mono font-bold">
                {timeLeft > 0 ? `TERKUNCI: ${timeLeft}s` : "SIAP DICAIRKAN"}
              </span>
            </div>
          </div>

          {/* CARD 2: ACTION */}
          <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col gap-6">
            {/* Input Group */}
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 focus-within:border-purple-500 transition-colors">
                <label className="text-xs text-slate-500 font-bold block mb-2">
                  JUMLAH DEPOSIT
                </label>
                <div className="flex justify-between items-center">
                  <input
                    type="number"
                    placeholder="0.0"
                    className="bg-transparent text-2xl font-bold w-full outline-none text-white placeholder-slate-700"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-sm font-bold">
                    ETH
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[10, 60, 300, 3600].map((t) => (
                  <button
                    key={t}
                    onClick={() => setLockTime(t.toString())}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${lockTime === t.toString()
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600"
                      }`}
                  >
                    {t < 60 ? `${t}s` : `${t / 60}m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={handleNabung}
              disabled={isPending}
              className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Memproses..." : "Deposit Sekarang ↗"}
            </button>

            <button
              onClick={handleWithdraw}
              disabled={timeLeft > 0 || !saldoData || saldoData === BigInt(0)}
              className={`w-full py-4 font-bold text-lg rounded-xl border-2 transition-all 
                ${timeLeft > 0 || !saldoData || saldoData === BigInt(0)
                  ? "border-slate-800 text-slate-600 cursor-not-allowed"
                  : "border-green-500 text-green-400 hover:bg-green-500/10"
                }`}
            >
              Cairkan Aset 💸
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
