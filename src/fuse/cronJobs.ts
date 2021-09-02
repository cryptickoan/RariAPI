import axios from "axios"
import Fuse  from "FuseSDK";
import { getFuseModel } from "./fuseModels"

// Subgraph type
// export type fusePool = {
//     index: string
//     name: string,
//     totalBorrowUSD: string,
//     totalLiquidityUSD: string,
//     totalSupplyUSD: string
// }


interface FusePool {
    name: string
    creator: string
    compotroller: string
    isPrivate: boolean
}

export interface MergedPool {
    id: number
    pool: FusePool
    underlyingTokens: string[]
    underlyingSymbols: string[]
    suppliedUSD: number
    borrowedUSD: number
}

export const fetchPools = async (FuseInstance: Fuse) => {
    const [
        {
            0: ids,
            1: fusePools,
            2: totalSuppliedETH,
            3: totalBorrowedETH,
            4: underlyingTokens,
            5: underlyingSymbols
        },
        ethPrice
    ] = await Promise.all([
        FuseInstance.contracts.FusePoolLens.callStatic.getPublicPoolsWithData(),
        (parseInt((await FuseInstance.getEthUsdPriceBN()).toString()) * 1e-2).toFixed(2)
    ])

    // const merged: MergedPool[] = [];
    // for (let id = 0; id < ids.length; id++) {
    //     console.log(fusePools[id].name)
    //     merged.push({
    //         underlyingTokens: underlyingTokens[id], 
    //         underlyingSymbols: underlyingSymbols[id],
    //         pool: filterOnlyObjectProperties(fusePools[id]),
    //         id: ids[id],
    //         suppliedUSD: (totalSuppliedETH[id] / 1e18) * parseFloat(ethPrice),
    //         borrowedUSD: (totalBorrowedETH[id] / 1e18) * parseFloat(ethPrice)
    //     })
    // }

    for (let id = 0; id < ids.length; id++) {
        const model = getFuseModel(fusePools[id].name)

        const newEntry = new model({
            date: Date.now(),
            totalSupply: totalSuppliedETH > 0 ? (totalSuppliedETH[id] / 1e18) * parseFloat(ethPrice) : 0
        })

        await newEntry.save()
        console.log('works for ', fusePools[id].name)
    }

    
}


// This function will use the subgraph once its working properly
// export const getFuse = async () => {
    
//     try {
//         const data: fusePool[] = (await axios({
//             url: 'https://api.thegraph.com/subgraphs/name/zacel/fusedemo',
//             method: 'post',
//             data: {
//                 query: `
//                     {
//                     pools {
//                     index
//                     name
//                     totalBorrowUSD
//                     totalSupplyUSD
//                     totalLiquidityUSD
//                     }
//                 }
//                 `
//             }
//         })).data.data.pools

//         console.log(data)
        
//         let total: number = 0

//         data.forEach(async (pool) => {
//             const model = getFuseModel(pool.index)

//             const entry = new model({
//                 date: Date.now(),
//                 totalSupply: pool.totalSupplyUSD
//             })
            
//             total += parseInt(pool.totalSupplyUSD)

//             // await entry.save()
//             console.log('worked for ', pool.name, pool.totalSupplyUSD)
//         })
//         console.log(total)

//     } catch(error) {
//         return error
//     }
// }