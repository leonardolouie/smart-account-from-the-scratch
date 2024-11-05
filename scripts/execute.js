const hre = require("hardhat");

const FACTORY_NONCE = 1; //
const FACTORY_ADDRESS = "0x9A676e781A523b5d0C0e43731313A708CB607508";
const EP_ADDRESS = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";
const PM_ADDRESS = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1";

async function main() {
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  //create: hash(deployer address + nonce);
  //create2: hash(0xFF + sender + bytecode+ salt);

  const sender = await hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  console.log(sender, "sender");

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

  const initCode = "0x";

  // const getInitCode = await hre.ethers.getInitCode(FACTORY_ADDRESS);
  // const initCode =
  //   FACTORY_ADDRESS +
  //   AccountFactory.interface
  //     .encodeFunctionData("createAccount", [address0])
  //     .slice(2);

  // await entryPoint.depositTo(PM_ADDRESS, {
  //   value: hre.ethers.parseEther("100"),
  // }); // need to recheck the balance

  const Account = await hre.ethers.getContractFactory("Account");
  const userOp = {
    sender, // smart contract address
    nonce: await entryPoint.getNonce(sender, 0),
    initCode: initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    callGasLimit: 400_000,
    verificationGasLimit: 400_000,
    preVerificationGas: 100_000,
    maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
    paymasterAndData: PM_ADDRESS,
    signature: "0x",
  };

  const userOpHash = await entryPoint.getUserOpHash(userOp);
  userOp.signature = await signer0.signMessage(hre.ethers.getBytes(userOpHash));

  console.log(userOp, "userOperation data");
  const tx = await entryPoint.handleOps([userOp], address0);
  const receipt = await tx.wait();
  console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
