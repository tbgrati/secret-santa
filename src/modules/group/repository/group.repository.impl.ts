import {PrismaClient} from '@prisma/client';
import {GroupRepository} from "./group.repository";
import {CreateGroupDTO} from "../dto";


export class GroupRepositoryImpl implements GroupRepository{

    constructor(private db: PrismaClient) {}
    async createGroup(data: CreateGroupDTO) {
        return this.db.group.create({
            data
        });
    }

    async findGroupById(id: string) {
        console.log(id);
        return this.db.group.findUnique({
            where: {
                id,
            },
        });
    }

}
