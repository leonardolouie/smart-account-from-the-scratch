const hre = require("hardhat");

const SMART_ACCOUNT = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
const EP_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const PM_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
async function main() {
  const account = await hre.ethers.getContractAt("Account", SMART_ACCOUNT);
  const count = await account.count();

  console.log(`Count value of address ${SMART_ACCOUNT} is ${count}`);

  console.log(
    "account balance SMART_ACCOUNT",
    await hre.ethers.provider.getBalance(SMART_ACCOUNT)
  );
  console.log(
    "account balance EP_ADDRESS ",
    await hre.ethers.provider.getBalance(EP_ADDRESS)
  );
  console.log(
    "account balance PM_ADDRESS ",
    await hre.ethers.provider.getBalance(PM_ADDRESS)
  );

  const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
  console.log(
    "Balance of Smart Account in EP",
    await ep.balanceOf(SMART_ACCOUNT)
  );
  console.log("Balance of Paymaster in EP", await ep.balanceOf(PM_ADDRESS));
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
