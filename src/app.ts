import express from 'express'
import cors from 'cors'

import { router } from './routes'

const app = express()
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//module.exports = app;