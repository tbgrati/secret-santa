import {GroupPersonRepository} from "./group-person.repository";
import {PrismaClient} from "@prisma/client";
import {GroupPersonDTO} from "../dto";


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

    async getGroupPersons(groupId:string): Promise <GroupPersonDTO[]> {
        const groupPersons = await this.db.groupPerson.findMany({
            where: { groupId },
            select: {
                id: true,
                person: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        return groupPersons.map(groupPerson => new GroupPersonDTO({
            id: groupPerson.id,
            name: groupPerson.person.name
        }));
    }
}