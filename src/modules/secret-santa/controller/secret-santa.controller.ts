import {Router} from "express";
import db from "../../../utils/database";
import {SecretSantaServiceImpl} from "../service/secret-santa.service.impl";
import {SecretSantaRepositoryImpl} from "../repository/secret-santa.repository.impl";
import {SecretSantaV1ServiceImpl} from "../service/secret-santa-v1.service.impl";
import {SecretSantaV2ServiceImpl} from "../service/secret-santa-v2.service.impl";
import {groupService} from "../../group/controller/group.controller";


export const secretSantaRouter = Router({ mergeParams: true })

const secretSantaRepository = new SecretSantaRepositoryImpl(db)
const secretSantaService = new SecretSantaServiceImpl(secretSantaRepository)
const secretSantaV1Service = new SecretSantaV1ServiceImpl(groupService,secretSantaRepository)
const secretSantaV2Service = new SecretSantaV2ServiceImpl(groupService,secretSantaRepository)

secretSantaRouter.get('/:groupId', async (req, res) => {
    try {
        const group = await secretSantaService.getHistory(req.params.groupId);
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({error: 'Failed to create group'});
    }
})

secretSantaRouter.post('/:groupId', async (req, res) => {
    try {
        const params = req.params as { version: string; groupId: string };
        const { version, groupId } = params;
        switch(version){
            case 'V1': {
                const secretSantas = await secretSantaV1Service.generate(groupId);
                res.status(201).json(secretSantas);
                break
            }
            case 'V2': {
                const secretSantas = await secretSantaV2Service.generate(groupId);
                res.status(201).json(secretSantas);
                break
            }
            default:{
                res.status(500).json({error: 'Invalid version'});
                break
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to generate secret santa'});
    }
})