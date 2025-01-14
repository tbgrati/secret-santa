import {SecretSantaHistoryDTO} from "../dto";
import {GroupPersonDTO} from "../../group/dto";
import {GroupService} from "../../group/service/group.service";
import {SecretSantaRepository} from "../repository/secret-santa.repository";
import {SecretSantaGeneratorService} from "./secret-santa-generator";
import {InvalidRequestError} from "../../../utils/error";

export class SecretSantaV2ServiceImpl implements SecretSantaGeneratorService{
    constructor(
        private groupService: GroupService,
        private secretSantaRepository: SecretSantaRepository
    ) {}

    private wasDrawnPreviously(gifter: string, giftee: string,santaHistory: SecretSantaHistoryDTO[]): boolean{
        return santaHistory.some(santa => santa.gifter === gifter && santa.giftee === giftee)
    }

    async generate(groupId: string, totalTries?: number): Promise<Record<string, string>>{
        // just a constant used for altering the year limit for generating secret santas
        const yearDifLimit = 1
        const yearMinLimit = (new Date().getFullYear()) - yearDifLimit;
        const santaHistory = await this.secretSantaRepository.getGroupSecretSantasByYear(groupId, yearMinLimit)
        const groupPersons: GroupPersonDTO[] = await this.groupService.getGroupPersons(groupId)

        const assignments: Record<string, string> = {};

        if(groupPersons.length < 2 ){
            throw new InvalidRequestError("Not enough participants in this group for Secret Santa");
        }

        const gifters: GroupPersonDTO[] = [...groupPersons];
        const giftees: GroupPersonDTO[] = [...groupPersons];
        const shiftIndex = this.getRandomInt(groupPersons.length);
        let gifterCounter = 0

        for (const gifter of gifters) {
            let gifteeIndex = (gifterCounter + shiftIndex) % groupPersons.length;
            let giftee = giftees[gifteeIndex];
            let tries = 0;

            while (
                this.wasDrawnPreviously(gifter.id, giftee.id, santaHistory) ||
                gifter.id === giftee.id ||
                Object.values(assignments).includes(giftee.id)
                ) {
                gifteeIndex = (gifteeIndex + 1) % groupPersons.length;
                giftee = giftees[gifteeIndex];
                tries++;
                if (tries >= groupPersons.length) {
                    return this.generate(groupId, totalTries ? totalTries + 1 : 1);
                }
            }
            if(totalTries === (groupPersons.length * 3)){
                throw new InvalidRequestError("Unable to generate secret santas")
            }
            assignments[gifter.id] = giftee.id;
            gifterCounter++
        }
        this.secretSantaRepository.create(assignments)
        return assignments
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

}