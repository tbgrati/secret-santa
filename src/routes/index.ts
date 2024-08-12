import { Router } from 'express'

import { personRouter } from '../modules/person/controller/person.controller'
import { groupRouter } from "../modules/group/controller/group.controller";
import {secretSantaV1Router} from "../modules/secret-santa-v1/controller/secret-santa-v1.controller";
import {secretSantaRouter} from "../modules/secret-santa/controller/secret-santa.controller";

export const router = Router()

router.use('/person', personRouter)

router.use('/group', groupRouter)

router.use('/secret_santa', secretSantaRouter)

router.use('/V1', secretSantaV1Router)

