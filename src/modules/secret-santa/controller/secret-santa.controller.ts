import {Router} from "express";
import {db} from "../../../utils/database";
import {SecretSantaServiceImpl} from "../service/secret-santa.service.impl";
import {SecretSantaRepositoryImpl} from "../repository/secret-santa.repository.impl";

export const secretSantaRouter = Router()

export const secretSantaRepository = new SecretSantaRepositoryImpl(db)
const secretSantaService = new SecretSantaServiceImpl(secretSantaRepository)

secretSantaRouter.get('/:groupId', async (req, res) => {
    try {
        const group = await secretSantaService.getHistory(req.params.groupId);
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({error: 'Failed to create group'});
    }
})