// Rari
import Rari from 'rari-sdk'
import Fuse from 'FuseSDK'

// Express
import express from 'express'

// Cors
import cors from 'cors'

// Models
import { connect, getModel } from './vaults/models'  
import { getFuseModel, getFuseModelWithID } from './fuse/fuseModels'

// CronJobs
import cron from 'node-cron'
import { runSupply, runAPY } from './vaults/cronJobs'
import { fetchPools } from './fuse/cronJobs'

const RariInstance = new Rari("https://eth-mainnet.alchemyapi.io/v2/2Mt-6brbJvTA4w9cpiDtnbTo6qOoySnN")
const FuseInstance = new Fuse("https://eth-mainnet.alchemyapi.io/v2/2Mt-6brbJvTA4w9cpiDtnbTo6qOoySnN")

const app = express()
app.use(cors())

cron.schedule('0 */4 * * *', () => {
    runSupply(RariInstance)
    runAPY(RariInstance)
}).start()

app.get('/history/supply/:pool', async (req: express.Request, res: express.Response) => {
    // If :pool does not reference an existing pool return 500 (server error)
    if (!req.params || (req.params.pool !== "USDC" && req.params.pool !== "DAI")) return res.status(500).send()

    const poolKey = req.params.pool

    // Find moddel
    const poolModel = getModel(poolKey, "supply")
    poolModel.find({}).then((entries) => res.status(200).json(entries))
})

app.get('/history/apy/:pool', async (req: express.Request, res: express.Response) => {
    // If :pool does not reference an existing pool return 500 (server error)
    if (!req.params || (req.params.pool !== "USDC" && req.params.pool !== "DAI")) return res.status(500).send()
    
    const poolKey = req.params.pool

    // Find moddel
    const poolModel = getModel(poolKey, "apy")
    poolModel.find({}).then((entries) => res.status(200).json(entries))
})


app.get('/fuse/history/supply/:pool', async (req: express.Request, res: express.Response) => {
    if (!req.params || ! (parseInt(req.params.pool) >= 0 && (parseInt(req.params.pool) <= 28))) return res.status(500).send()
    
    const poolKey = req.params.pool

    const model = getFuseModelWithID(poolKey)
    model.find({}).then((entries) => res.status(200).json(entries))
    
})

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    connect();
})