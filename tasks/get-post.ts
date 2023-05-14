import { task } from "hardhat/config"
import { LensHub__factory } from "../../vendor/lens-protocol/typechain-types"
import { getAddrs, initEnv } from "../../src/utils/hardhatUtils"

task("get-post", "get a publication by a profile")
  .addParam("handle", "The user's handle")
  .addParam("pub", "The publication's id")
  .setAction(async (taskArgs, hre) => {
    const [governance] = await initEnv(hre)
    const addrs = getAddrs()
    const lensHub = LensHub__factory.connect(addrs["lensHub proxy"], governance)
    const profileId = await lensHub.getProfileIdByHandle(taskArgs.handle)
    const pubCount = await lensHub.getPubCount(profileId)
    console.log(`User profileId: ${profileId}`)
    console.log(`Total publications by user: ${pubCount}`)
    const pub = await lensHub.getPub(profileId, taskArgs.pub)
    console.log(`Publication:`, pub)
  })

task("get-post-by-id", "get a publication by a profile")
  .addParam("id", "The user's handle")
  .addParam("pub", "The publication's id")
  .setAction(async (taskArgs, hre) => {
    const [governance] = await initEnv(hre)
    const addrs = getAddrs()
    const lensHub = LensHub__factory.connect(addrs["lensHub proxy"], governance)
    // const profileId = await lensHub.getProfileIdByHandle(taskArgs.handle)
    const profileId = taskArgs.id
    const pubCount = await lensHub.getPubCount(profileId)
    console.log(`User profileId: ${profileId}`)
    console.log(`Total publications by user: ${pubCount}`)
    const pub = await lensHub.getPub(profileId, taskArgs.pub)
    console.log(`Publication:`, pub)
  })

task("get-posts", "get all posts by profile")
  .addParam("handle", "The user's handle")
  .setAction(async (taskArgs, hre) => {
    const [governance] = await initEnv(hre)
    const addrs = getAddrs()
    const lensHub = LensHub__factory.connect(addrs["lensHub proxy"], governance)
    const profileId = await lensHub.getProfileIdByHandle(taskArgs.handle)
    const pubCount = await lensHub.getPubCount(profileId)
    console.log(`Total publications by user: ${pubCount}`)
    for (let i = 1; i <= pubCount.toNumber(); i++) {
      console.log(`Publication: ${await lensHub.getPub(profileId, i)}`)
    }
  })
