import {Router} from "express";
import {db} from "../../../utils/database";

export const secretSantaRouter = Router()



secretSantaRouter.get('/:groupId', async (req, res) => {
    try {
        const group = await secretSantaService.getHistory(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({error: 'Failed to create group'});
    }
})