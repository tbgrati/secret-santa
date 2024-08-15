import {PersonServiceImpl} from '../service/person.service.impl';
import BodyValidator from '../../../utils/body-validator'
import {CreatePersonDTO} from "../dto";
import db from '../../../utils/database'
import {Router} from 'express';
import {PersonRepositoryImpl} from "../repository/person.repository.impl";


export const personRouter = Router()

const personService = new PersonServiceImpl(new PersonRepositoryImpl(db))

personRouter.post('/', BodyValidator(CreatePersonDTO), async (req, res) => {
    try {
        const person = await personService.createPerson(req.body);
        res.status(201).json(person);
    } catch (error) {
        res.status(500).json({error:'Failed to create person'});
    }
})

