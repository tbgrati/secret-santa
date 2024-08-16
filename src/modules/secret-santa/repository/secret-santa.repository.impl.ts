import {SecretSantaRepository} from "./secret-santa.repository";
import {PrismaClient} from "@prisma/client";
import {SecretSantaHistoryDTO} from "../dto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {InvalidRequestError} from "../../../utils/error";

export class SecretSantaRepositoryImpl implements SecretSantaRepository{

    constructor(private db: PrismaClient){}
    async create(assignments: Record<string, string>): Promise<void> {
        const currentYear = new Date().getFullYear();

        const assignmentData = Object.entries(assignments).map(([gifterId, gifteeId]) => ({
            gifterId,
            gifteeId,
            year: currentYear
        }));

        try{
            await this.db.secretSanta.createMany({
                data: assignmentData,
            });
        }
        catch (e){
            throw new InvalidRequestError("Secret santas have already been assigned for this year.");
        }
    }
    async getGroupSecretSantasByYear(groupId: string, year: number): Promise<SecretSantaHistoryDTO[]>{
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

        return secretSantas.map(secretSanta => new SecretSantaHistoryDTO({
            gifter: secretSanta.gifter.person.name,
            giftee: secretSanta.giftee.person.name,
            year: secretSanta.year
        }));
    }

    async getSecretSantaHistoryByGroupId(groupId: string): Promise<SecretSantaHistoryDTO[]> {
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

        return secretSantas.map(secretSanta => new SecretSantaHistoryDTO({
            gifter: secretSanta.gifter.person.name,
            giftee: secretSanta.giftee.person.name,
            year: secretSanta.year
        }));
    }

}