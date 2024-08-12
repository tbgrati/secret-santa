import {Router} from "express";
import {secretSantaRepository} from "../../secret-santa/controller/secret-santa.controller";
import {SecretSantaV1ServiceImpl} from "../service/secret-santa-v1.service.impl";
import {groupPersonRepository} from "../../group/controller/group.controller";

export const secretSantaV1Router = Router()

const secretSantaV1Service = new SecretSantaV1ServiceImpl(groupPersonRepository,secretSantaRepository)

secretSantaV1Router.post('/secret_santa/:groupId', async (req, res) => {
    try {
        const secretSantas = await secretSantaV1Service.generate(req.params.groupId);
        res.status(201).json(secretSantas);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to generate secret santa'});
    }
})


