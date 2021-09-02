import mongoose, { mongo } from 'mongoose'
import axios from 'axios'

const url = process.env.MONGODB_URI ?? ""

console.log('connecting to MongoDB')

export const connect = () => {
    return mongoose.connect(url)
        .then((result: any) => {
            console.log('connected to MongoDB')
        })
        .catch((error: any) => {
            console.log('error connecting to MongoDB:', error.message)
        })
}

const supplyEntrySchema = new mongoose.Schema({
    date: Number,
    totalSupply: Number,
})

const apyEntrySchema = new mongoose.Schema({
    date: Number,
    poolAPY: Number
})

apyEntrySchema.set('toJSON', {
    transform: (document: any, returnedObject: any) => {
        delete returnedObject._id 
        delete returnedObject.__v
    }
})

supplyEntrySchema.set('toJSON', {
    transform: (document: any, returnedObject: any) => {
        delete returnedObject._id 
        delete returnedObject.__v
    }
})

export const stableApy = mongoose.model('stableAPY', apyEntrySchema)
export const daiApy = mongoose.model('daiAPY', apyEntrySchema)

// Vaults
export const stableEntries = mongoose.model('stableEntry', supplyEntrySchema)
export const daiEntries = mongoose.model('daiEntry', supplyEntrySchema)


export const getModel = (pool: string, type: string) => { 
    switch (pool) {
        case 'USDC':
            return type === "supply" ? stableEntries : stableApy 
        case 'DAI':
            return type === "supply" ? daiEntries : daiApy
        default:
            return daiEntries
    }
  }
