import {SecretSantaRepository} from "./secret-santa.repository";
import {PrismaClient} from "@prisma/client";

export class SecretSantaRepositoryImpl implements SecretSantaRepository{

    constructor(private db: PrismaClient){}
    async create(gifterId: string, gifteeId: string) {
        const currentYear = new Date().getFullYear();

        return this.db.secretSanta.create({
            data: {
                gifter: { connect: { id: gifterId } },
                giftee: { connect: { id: gifteeId } },
                year: currentYear
            },
        });
    }

    async findSecretSantasByGroupId(groupId: string) {
        const secretSantas = await this.db.secretSanta.findMany({
            where: {
                gifter: {
                    is: {
                        groupId: groupId,
                    },
                },
                giftee: {
                    is: {
                        groupId: groupId,
                    },
                },
            },
            select: {
                year: true,
                gifter: {
                    select: {
                        person: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                giftee: {
                    select: {
                        person: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        const result: Record<string, Record<string, string>> = {};

        secretSantas.forEach(entry => {
            const { year, gifter, giftee } = entry;
            const gifterName = gifter.person.name;
            const gifteeName = giftee.person.name;

            if (!result[year]) {
                result[year] = {};
            }

            result[year][gifterName] = gifteeName;
        });

        return result;
    }

}