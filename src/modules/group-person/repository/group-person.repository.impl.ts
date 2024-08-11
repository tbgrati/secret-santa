import {GroupPersonRepository} from "./group-person.repository";
import {PrismaClient} from "@prisma/client";


export class GroupPersonRepositoryImpl implements GroupPersonRepository{

    constructor(private db: PrismaClient) {}
    async addPersonToGroup(personId: string, groupId: string){
        return this.db.groupPerson.create({
            data: {
                personId: personId,
                groupId: groupId
            }
        });
    }
}