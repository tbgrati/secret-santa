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

    async getGroupPersons(groupId:string){
        const groupPersons = await this.db.groupPerson.findMany({
            where: { groupId },
            select: {
                id: true,
                select:{
                    person: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        });

        //TODO: modify this map to include personName
        return groupPersons.map(groupPerson => groupPerson.id)
    }
}