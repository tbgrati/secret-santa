import express, {NextFunction} from 'express'
import cors from 'cors'

import { router } from './routes'
import {ErrorHandler} from "./utils/error";

const app = express()
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api', router)

app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});