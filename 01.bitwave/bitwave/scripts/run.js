const main = async () => {
  const [owner, randomPreson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  const getContractBalance = async () => {
    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
  };

  await getContractBalance();
  let totalWave = 0;
  totalWave = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  await getContractBalance();
  totalWave = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPreson).wave("Another message!");
  await waveTxn.wait();

  await getContractBalance();
  totalWave = await waveContract.getTotalWaves();

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
