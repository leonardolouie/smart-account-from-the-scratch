// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("AccountModule", (m) => {
  const { account } = ethers.getSigner();
  const lock = m.contract("Account", [account]);
  return { lock };
});