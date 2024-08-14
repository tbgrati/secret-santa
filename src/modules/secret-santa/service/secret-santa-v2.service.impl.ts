import {SecretSantaHistoryDTO} from "../dto";
import {GroupPersonDTO} from "../../group/dto";
import {GroupService} from "../../group/service/group.service";
import {SecretSantaRepository} from "../repository/secret-santa.repository";
import {SecretSantaGeneratorService} from "./secret-santa-generator";

export class SecretSantaV2ServiceImpl implements SecretSantaGeneratorService{
    constructor(
        private groupService: GroupService,
        private secretSantaRepository: SecretSantaRepository
    ) {}

    private wasDrawnPreviously(gifter: string, giftee: string,santaHistory: SecretSantaHistoryDTO[]): boolean{
        return santaHistory.some(santa => santa.gifter === gifter && santa.giftee === giftee)
    }

    async generate(groupId: string): Promise<Record<string, string>>{
        // just a constant used for altering the year limit for generating secret santas
        const yearDifLimit = 1
        const yearMinLimit = (new Date().getFullYear()) - yearDifLimit;
        const santaHistory = await this.secretSantaRepository.getGroupSecretSantasByYear(groupId, yearMinLimit)
        const groupPersons: GroupPersonDTO[] = await this.groupService.getGroupPersons(groupId)

        const assignments: Record<string, string> = {};

        if(groupPersons.length < 2 ){
            throw new Error("Not enough participants for Secret Santa");
        }

        const gifters: GroupPersonDTO[] = [...groupPersons];
        const shuffledGiftees: GroupPersonDTO[] = this.shuffleArray([...groupPersons]);

        for (const gifter of gifters) {
            let tries = 0;
            let gifteeIndex = this.generateRandomInt(shuffledGiftees.length);
            let giftee = shuffledGiftees[gifteeIndex];

            while (this.wasDrawnPreviously(gifter.id, giftee.id, santaHistory) || gifter.id === giftee.id) {
                if (tries === shuffledGiftees.length) {
                    throw new Error("Could not find a valid giftee for gifter with ID " + gifter.id);
                }
                gifteeIndex = this.generateRandomInt(shuffledGiftees.length);
                giftee = shuffledGiftees[gifteeIndex];
                tries++;
            }

            if (giftee) {
                shuffledGiftees.splice(gifteeIndex, 1);
                await this.secretSantaRepository.create(gifter.id, giftee.id);
                assignments[gifter.name] = giftee.name;
            }
        }
        return assignments
    }

    private generateRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }


    private shuffleArray(array: GroupPersonDTO[]): GroupPersonDTO[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}