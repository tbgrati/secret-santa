import {Router} from "express";
import {db} from "../../../utils/database";
import {GroupServiceImpl} from "../service/group.service.impl";
import {GroupRepositoryImpl} from "../repository/group.repository.impl";
import {GroupPersonRepositoryImpl} from "../repository/group-person.repository.impl";

export const groupRouter = Router()

export const groupPersonRepository = new GroupPersonRepositoryImpl(db)
const groupService = new GroupServiceImpl(new GroupRepositoryImpl(db), groupPersonRepository)

groupRouter.post('/', async (req, res) => {
    try {
        const group = await groupService.createGroup(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({error: 'Failed to create group'});
    }
})

groupRouter.post('/add/:id',async (req, res) =>{
    try {
        const personId = req.params.id;
        const groupId = req.body.id;
        const group = await groupService.addPersonToGroup(personId, groupId);
        res.status(201).json(group);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Failed to add person to group'});
    }
})

