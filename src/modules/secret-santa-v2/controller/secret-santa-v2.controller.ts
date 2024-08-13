import {Router} from "express";
import {secretSantaRepository} from "../../secret-santa/controller/secret-santa.controller";
import {SecretSantaV2ServiceImpl} from "../service/secret-santa-v2.service.impl";
import {groupPersonRepository} from "../../group/controller/group.controller";

export const secretSantaV2Router = Router()

const secretSantaV2Service = new SecretSantaV2ServiceImpl(groupPersonRepository,secretSantaRepository)

secretSantaV2Router.post('/secret_santa/:groupId', async (req, res) => {
    try {
        const secretSantas = await secretSantaV2Service.generate(req.params.groupId);
        res.status(201).json(secretSantas);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to generate secret santa'});
    }
})


