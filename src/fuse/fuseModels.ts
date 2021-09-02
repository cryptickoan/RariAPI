import mongoose from "mongoose"

// FuseEntrySchema
const fuseEntrySchema = new mongoose.Schema({
    date: Number,
    totalSupply: Number
})


fuseEntrySchema.set('toJSON', {
    transform: (document: any, returnedObject: any) => {
        delete returnedObject._id 
        delete returnedObject.__v
    }
})

// Fuse pools model
const PoolTogether = mongoose.model('PoolTogetherDepositTokens', fuseEntrySchema)
const RariDaoR7 = mongoose.model('RariDaoR7', fuseEntrySchema)
const StakeDao = mongoose.model('StakeDao', fuseEntrySchema)
const IndexCoop = mongoose.model('IndexCoop', fuseEntrySchema)
const CRV = mongoose.model('CRV', fuseEntrySchema)
const Pendle = mongoose.model('Pendle', fuseEntrySchema)
const RariDaoR1 = mongoose.model('RariDaoR1', fuseEntrySchema)
const Yearn = mongoose.model('Yearn', fuseEntrySchema)
const EuroDollar = mongoose.model('EuroDollar', fuseEntrySchema)
const OlympusPoolParty = mongoose.model('OlympusParty', fuseEntrySchema)
const Harvest = mongoose.model('Harvest', fuseEntrySchema)
const RariDaoR5 = mongoose.model('RariDaoR5', fuseEntrySchema)
const Cartesian = mongoose.model('Cartesian', fuseEntrySchema)
const RariDaoR4 = mongoose.model('RariDaoR4', fuseEntrySchema)
const BarnBridge = mongoose.model('BarnBridge', fuseEntrySchema)
const LidoPool = mongoose.model('LidoPool', fuseEntrySchema)
const Tetranode = mongoose.model('Tetranode', fuseEntrySchema)
const RariDAOR2 = mongoose.model('RariDaoR2', fuseEntrySchema)
const RenCrossChain = mongoose.model('RenCrossChain', fuseEntrySchema)
const Volmex = mongoose.model('Volmex', fuseEntrySchema)
const Woo = mongoose.model('Woo', fuseEntrySchema)
const RariDaoR3 = mongoose.model('RariDaoR3', fuseEntrySchema)
const TokenMass = mongoose.model('TokenMass', fuseEntrySchema)
const TetranodeMonth = mongoose.model('TetranodeMont', fuseEntrySchema)
const FraxReflexer = mongoose.model('FraxReflexer', fuseEntrySchema)
const Badger = mongoose.model('Badger', fuseEntrySchema)
const Vesper = mongoose.model('Vesper', fuseEntrySchema)
const TetranodeETH = mongoose.model('TetranodeETH', fuseEntrySchema)
const Debug = mongoose.model('debug', fuseEntrySchema)

export const Fuse = mongoose.model('Fuse', fuseEntrySchema)

export const getFuseModel = (pool: string) => {
    switch (pool) {
        case "11":
            return PoolTogether;
        case "5":
            return RariDaoR7
        case  "27":
            return StakeDao
        case  "19":
            return IndexCoop
        case "20":
            return CRV
        case "21":
            return Pendle
        case "0":
            return RariDaoR1
        case "13":
            return Yearn
        case "12":
            return EuroDollar
        case "18":
            return OlympusPoolParty
        case "24":
            return Harvest
        case "4":
            return RariDaoR5
        case "15":
            return Cartesian
        case "3":
            return RariDaoR4
        case "25":
            return BarnBridge
        case "16":
            return LidoPool
        case "6":
            return Tetranode
        case "1":
            return RariDAOR2
        case "10":
            return RenCrossChain
        case "17":
            return Volmex
        case "14":
            return Woo
        case "2":
            return RariDaoR3
        case "26":
            return TokenMass
        case "8":
            return TetranodeMonth
        case "9":
            return FraxReflexer
        case "22":
            return Badger
        case "23":
            return Vesper
        case "7":
            return TetranodeETH
        default:
            return Debug
    }
}
