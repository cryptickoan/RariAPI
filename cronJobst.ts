// Models
import { stableEntries, daiEntries, daiApy, stableApy } from './models'

// Rari
import Rari from 'rari-sdk'

// Ethers
import { BigNumber } from '@ethersproject/bignumber'

const stableEntriess = stableEntries
const daiEntriess = daiEntries

const daiApyy = daiApy
const stableApyy = stableApy

export const runSupply = async (RariInstance: Rari) => {
    const stableFundBalanceBN = await RariInstance.pools.stable.balances.getTotalSupply()
    const daiFundBalanceBN = await RariInstance.pools.dai.balances.getTotalSupply() 

    const stableFundBalance = stableFundBalanceBN.toString() / 1e18
    const daiFundBalance = daiFundBalanceBN.toString() / 1e18

    const stableEntry = new stableEntriess({
        date: Date.now(),
        totalSupply: stableFundBalance
    })

    const daiEntry = new daiEntriess({
        date: Date.now(),
        totalSupply: daiFundBalance
    })

    await stableEntry.save()
    await daiEntry.save()
    console.log('hey')
}

export const runAPY = async (RariInstance: Rari) => {
    const rawStablePoolAPY = await RariInstance.pools.stable.apy.getCurrentRawApy();
    const rawDaiPoolAPY = await RariInstance.pools.dai.apy.getCurrentRawApy();

    const daiPoolAPY = (rawDaiPoolAPY.mul(BigNumber.from(100)).toString() / 1e18).toFixed(2);
    const stablePoolAPY = (rawStablePoolAPY.mul(BigNumber.from(100)).toString() / 1e18).toFixed(2);

    const daiAPY = new daiApyy({
        date: Date.now(),
        poolAPY: daiPoolAPY
    })

    const stableAPY = new stableApyy({
        date: Date.now(),
        poolAPY: stablePoolAPY
    })

    await daiAPY.save()
    await stableAPY.save()
    console.log('hey')

}