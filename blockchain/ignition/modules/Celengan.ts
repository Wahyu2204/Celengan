import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CelenganModule = buildModule("CelenganModule", (m) => {
  // Deploy contract "Celengan"
  // Karena constructor kita kosong (gak ada parameter), jadi gak perlu input apa-apa
  const celengan = m.contract("Celengan");

  return { celengan };
});

export default CelenganModule;