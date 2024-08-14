import { PrismaClient } from '@prisma/client';
import {GroupRepository} from "../repository/group.repository";
import {GroupService} from "./group.service";
import {CreateGroupDTO} from "../dto";
import {GroupPersonRepository} from "../repository/group-person.repository";


export class GroupServiceImpl implements GroupService {

    constructor(
        private groupRepository: GroupRepository,
        private groupPersonRepository: GroupPersonRepository
    ) {}

    async createGroup(data: CreateGroupDTO) {
        return await this.groupRepository.createGroup(data);
    }

    async getGroupPersons(groupId: string){
        return await this.groupPersonRepository.getGroupPersons(groupId);
    }

    async addPersonToGroup(personId: string, groupId: string) {
        const group = await this.groupRepository.findGroupById(groupId);

        if (group) {
            return await this.groupPersonRepository.addPersonToGroup(personId, groupId);
        } else {
            throw new Error('Group not found');
        }
    }
}

