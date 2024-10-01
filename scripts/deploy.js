const { ethers } = require("hardhat");

async function main() {

  const FuturesContract = await ethers.deployContract("FuturesContract");

  console.log("Deploying contract...");

  await FuturesContract.waitForDeployment();

  console.log("FuturesContract deployed to:", FuturesContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });