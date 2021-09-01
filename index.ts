// Rari
import Rari from 'rari-sdk'

// Express
import express from 'express'

// Cors
import cors from 'cors'

// Models
import { connect, getModel } from './models'  

// CronJobs
import cron from 'node-cron'
import { runSupply, runAPY } from './cronJobst'

const RariInstance = new Rari("https://turbogeth.crows.sh")

const app = express()
app.use(cors())

cron.schedule('0 */4 * * *', () => {
    runSupply(RariInstance)
    runAPY(RariInstance)
}).start()

app.get('/', async (req, res) => {
    res.status(200).send('hello friend')
})

app.get('/history/supply/:pool', async (req: express.Request, res: express.Response) => {
    // If :pool does not reference an existing pool return 500 (server error)
    if (!req.params || (req.params.pool !== "USDC" && req.params.pool !== "DAI")) return res.status(500).send()

    const poolKey = req.params.pool

    // Find moddel
    const poolModel = getModel(poolKey, "supply")
    poolModel.find({}).then((entries: any) => res.status(200).json(entries))
})

app.get('/history/apy/:pool', async (req: express.Request, res: express.Response) => {
    // If :pool does not reference an existing pool return 500 (server error)
    if (!req.params || (req.params.pool !== "USDC" && req.params.pool !== "DAI")) return res.status(500).send()
    
    const poolKey = req.params.pool

    // Find moddel
    const poolModel = getModel(poolKey, "apy")
    poolModel.find({}).then((entries: any) => res.status(200).json(entries))
})


app.listen(3003, () => {
    connect();
})