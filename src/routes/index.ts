import { Router } from 'express'

import { personRouter } from '../modules/person/controller/person.controller'
import { groupRouter } from "../modules/group/controller/group.controller";

export const router = Router()

router.use('/person', personRouter)

router.use('/group', groupRouter)

