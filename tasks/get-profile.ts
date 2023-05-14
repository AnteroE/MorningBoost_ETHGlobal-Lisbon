import { task } from "hardhat/config"
import { getAddrs, initEnv } from "../../src/utils/hardhatUtils"
import { LensHub__factory } from "../../vendor/lens-protocol/typechain-types"

task("get-profile-by-handle", "get a profile by handle")
  .addParam("handle", "The user's handle")
  .setAction(async (taskArgs, hre) => {
    const [governance] = await initEnv(hre)
    const addrs = getAddrs()
    const lensHub = LensHub__factory.connect(addrs["lensHub proxy"], governance)
    console.log("lenshub addr", addrs["lensHub proxy"])
    const profileId = await lensHub.getProfileIdByHandle(taskArgs.handle)
    console.log(`Profile id: ${profileId}`)
    console.log("getProfile", await lensHub.getProfile(profileId))
    // 17462
    console.log(`Profile owner: ${await lensHub.ownerOf(profileId)}`)

    // console.log("owner", await lensHub.ownerOf(33))
    // const mnem = getMnemonicWallet();
    // console.log("mne", await mnem.getAddress())
    // console.log("mne bal", await mnem.getBalance())
    // const privk = getPrivateKeyWallet();
    // console.log("privk", await privk.getAddress())
    // console.log("privk bal", await privk.getBalance())
  })

task("get-profile-by-id", "get a profile by id")
  .addParam("id", "The user's id")
  .setAction(async (taskArgs, hre) => {
    const [governance] = await initEnv(hre)
    const addrs = getAddrs()
    const lensHub = LensHub__factory.connect(addrs["lensHub proxy"], governance)
    console.log(`Total supply: ${await lensHub.totalSupply()}`)
    const profile = await lensHub.getProfile(taskArgs.id)
    // console.log(profile[0])
    // console.log(JSON.stringify(profile[0]))
    console.log("handle", profile.handle)
    console.log(`Profile data: ${await lensHub.getProfile(taskArgs.id)}`)
    console.log(`Profile owner: ${await lensHub.ownerOf(taskArgs.id)}`)
  })

task("get-dispatcher", "get a profile's dispatcher by id")
  .addParam("id", "The user's id")
  .setAction(async (taskArgs, hre) => {
    const [governance] = await initEnv(hre)
    const addrs = getAddrs()
    const lensHub = LensHub__factory.connect(addrs["lensHub proxy"], governance)
    const profile = await lensHub.getProfile(taskArgs.id)
    console.log("handle", profile.handle)
    console.log(`Profile data: ${await lensHub.getProfile(taskArgs.id)}`)
    console.log(`Profile dispatcher: ${await lensHub.getDispatcher(taskArgs.id)}`)
    console.log(`Profile owner: ${await lensHub.ownerOf(taskArgs.id)}`)
  })
