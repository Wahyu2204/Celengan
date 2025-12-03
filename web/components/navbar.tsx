"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-fit rounded-sm max-w-screen-md border border-slate-800 bg-slate-950/80 py-3 shadow-xl backdrop-blur-md md:top-6 md:rounded-1xl lg:max-w-5xl">
      <div className="px-4">
        <div className="flex items-center justify-between gap-8">
          {/* LOGO KIRI */}
          <div className="flex shrink-0">
            <Link
              aria-current="page"
              className="flex items-center gap-2 group"
              href="/"
            >
              {/* Animasi goyang dikit pas di hover */}
              <span className="text-3xl transition-transform group-hover:rotate-12">
                🐷
              </span>
              <p className="font-bold text-slate-200 hidden sm:block group-hover:text-purple-400 transition-colors">
                Celengan
              </p>
            </Link>
          </div>

          {/* TENGAH */}
          <div className="hidden md:flex md:items-center md:justify-center mx-auto">
            <Link
              className="inline-block rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white"
              href="#"
            >
              Features
            </Link>
            <Link
              className="inline-block rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white"
              href="#"
            >
              About Us
            </Link>
          </div>

          {/* TOMBOL KANAN (CONNECT WALLET) */}
          {/* <div className="flex items-center justify-end gap-3">
            <ConnectButton
              showBalance={false}
              chainStatus="icon"
              accountStatus="avatar"
            />
          </div> */}
          <div className="flex items-center justify-end gap-3">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                mounted,
              }) => {
                // 1. Cek apakah sudah siap & connect
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      // A. KONDISI BELUM CONNECT (Tampilkan Icon Wallet)
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="group flex h-10 w-10 items-center justify-center rounded-sm bg-slate-800 border border-slate-700 hover:bg-purple-600 hover:border-purple-500 transition-all duration-200 shadow-lg"
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
                          </button>
                        );
                      }

                      // B. KONDISI SUDAH CONNECT (Tampilkan Avatar User)
                      return (
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all overflow-hidden"
                          title={account.displayName}
                        >
                          {/* Kalau ada Ens Avatar pake itu, kalau gak ada pake Gradient */}
                          {account.ensAvatar ? (
                            <Image
                              width={20}
                              height={20}
                              src={account.ensAvatar}
                              alt={account.displayName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            // Gradient Avatar Generator (Biar keren)
                            <div className="h-full w-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                              {/* Ambil 2 huruf depan address (misal: 0x) */}
                              <span className="text-xl">👾</span>
                            </div>
                          )}
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </header>
  );
}
