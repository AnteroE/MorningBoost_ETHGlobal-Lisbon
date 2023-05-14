import { utils } from "ethers";
import { task } from "hardhat/config";

const EVM_ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

task("post", "publishes a post").setAction(async ({}, hre) => {
  const addrs = getAddrs();
  const [, , profileOwner] = await initEnv(hre);
  const lensHub = LensHub__factory.connect(
    addrs["lensHub proxy"],
    profileOwner,
  );

  const profileId = 205;
  const inputStruct: PostDataStruct = {
    profileId,
    contentURI:
      "https://arweave.net/FY7djHeSwj_MyqbpUR_-zwkco4kVDgEIBpdhOHXlfrw",
    collectModule: EVM_ZERO_ADDRESS,
    collectModuleInitData: utils.defaultAbiCoder.encode(["bool"], [true]),
    referenceModule: EVM_ZERO_ADDRESS,
    referenceModuleInitData: [],
  };

  const accountfromPK = new hre.ethers.Wallet(
    "0x1234"
    provider,
  );

  console.log("account address: ", accountfromPK.address);

  await waitForTx(lensHub.connect(accountfromPK).post(inputStruct));
  // await waitForTx(lensHub.connect(profileOwner).post(inputStruct))
  const pubCount = await lensHub.getPubCount(profileId);
  console.log(`Total publications by user: ${pubCount}`);
  console.log(await lensHub.getPub(profileId, pubCount));
});

task("task", "publishes a post").setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const freeCollectModuleAddr = addrs["free collect module"];
  const accountFromPK = new hre.ethers.Wallet(
    "1234",
    provider,
  );

  const lensHub = LensHub__factory.connect(
    addrs["lensHub proxy"],
    accountFromPK,
  );

  console.log(await lensHub.getProfile(360));
});

task("post-test-roofman", "publishes a post").setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const freeCollectModuleAddr = addrs["free collect module"];
  const accountfromPK = new hre.ethers.Wallet(
    "abcdefg",
    provider,
  );

  const lensHub = LensHub__factory.connect(
    addrs["lensHub proxy"],
    whitelistedAccount,
  );

  console.log(`Profile addr: ${accountfromPK.address}`);

  const profileId = 123;
  const inputStruct: PostDataStruct = {
    profileId,
    contentURI: "https://storage.googleapis.com/randomassets/8_2.json",
    collectModule: freeCollectModuleAddr,
    collectModuleInitData: utils.defaultAbiCoder.encode(["bool"], [true]),
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
  };

  await waitForTx(lensHub.connect(accountfromPK).post(inputStruct));
  const pubCount = await lensHub.getPubCount(profileId);
  console.log("PubCount", pubCount);
});
