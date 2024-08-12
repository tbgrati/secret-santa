import {SecretSantaRepository} from "./secret-santa.repository";
import {PrismaClient} from "@prisma/client";

export class SecretSantaRepositoryImpl implements SecretSantaRepository{

    constructor(private db: PrismaClient){}
    createSecretSanta(gifterId: string, gifteeId: string) {
        const currentYear = new Date().getFullYear();

        return this.db.secretSanta.create({
            data: {
                gifterId: gifterId,
                gifteeId: gifteeId,
                year: currentYear
            },
        });
    }

    async findSecretSantasByGroupId(groupId: string) {
        const groupPersons = await this.db.groupPerson.findMany({
            where: { groupId },
            select: { personId: true }
        });

        const personIds = groupPersons.map(groupPerson => groupPerson.personId);

        // Find SecretSanta entries involving these persons
        return this.db.secretSanta.findMany({
            where: {
                OR: [
                    { gifterId: { in: personIds } },
                    { gifteeId: { in: personIds } }
                ]
            }
        });
    }



}