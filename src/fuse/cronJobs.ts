import axios from "axios"
import { Fuse, getFuseModel } from "./fuseModels"

export type fusePool = {
    index: string
    name: string,
    totalBorrowUSD: string,
    totalLiquidityUSD: string,
    totalSupplyUSD: string
}

export const getFuse = async () => {
    
    try {
        const data: fusePool[] = (await axios({
            url: 'https://api.thegraph.com/subgraphs/name/zacel/fusedemo',
            method: 'post',
            data: {
                query: `
                    {
                    pools {
                    index
                    name
                    totalBorrowUSD
                    totalSupplyUSD
                    totalLiquidityUSD
                    }
                }
                `
            }
        })).data.data.pools

        console.log(data)
        
        let total: number = 0

        data.forEach(async (pool) => {
            const model = getFuseModel(pool.index)

            const entry = new model({
                date: Date.now(),
                totalSupply: pool.totalSupplyUSD
            })
            
            total += parseInt(pool.totalSupplyUSD)

            // await entry.save()
            console.log('worked for ', pool.name, pool.totalSupplyUSD)
        })
        console.log(total)

    } catch(error) {
        return error
    }
}