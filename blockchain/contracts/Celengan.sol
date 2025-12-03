// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Celengan {
    mapping(address => uint256) public saldo; //biar Frontend bisa nampilin angka Saldo di layar
    mapping(address => uint256) public deadline; // Kapan bisa diambil

    // 1. EVENT (Biar Frontend tau)
    event NabungSukses(address indexed user, uint256 amount, uint256 unlockTime); //Notif pop-up
    event TarikSukses(address indexed user, uint256 amount);

    function nabung(uint256 _waktuKunciDetik) public payable {
        require(msg.value > 0, "Minimal 1 perak dong");
        
        saldo[msg.sender] += msg.value;
        
        // Set waktu kunci (Sekarang + X detik)
        deadline[msg.sender] = block.timestamp + _waktuKunciDetik;
        
        // Teriak ke Frontend
        emit NabungSukses(msg.sender, msg.value, deadline[msg.sender]);
    }

    function ambilDuit() public {
        uint256 jumlah = saldo[msg.sender];
        require(jumlah > 0, "Gak punya duit lu");
        
        // Cek Waktu (Fitur Time Lock)
        require(block.timestamp >= deadline[msg.sender], "Celengan masih dikunci! Sabar.");

        saldo[msg.sender] = 0;
        payable(msg.sender).transfer(jumlah);

        emit TarikSukses(msg.sender, jumlah);
    }
    
    // Helper buat Frontend: Cek berapa detik lagi sisa waktunya
    function cekSisaWaktu() public view returns (uint256) { //Countdown Timer (Mundur hitung detik).
        if (block.timestamp >= deadline[msg.sender]) {
            return 0; // Sudah bisa diambil
        } else {
            return deadline[msg.sender] - block.timestamp;
        }
    }
}