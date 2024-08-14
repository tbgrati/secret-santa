import {SecretSantaRepository} from "../repository/secret-santa.repository";
import {GroupPersonDTO} from "../../group/dto";
import {SecretSantaGeneratorService} from "./secret-santa-generator";
import {GroupService} from "../../group/service/group.service";

export class SecretSantaV1ServiceImpl implements SecretSantaGeneratorService {

    constructor(
        private groupPersonService: GroupService,
        private secretSantaRepository: SecretSantaRepository
    ) {}
    async generate(groupId: string): Promise<Record<string,string>> {
        const persons = await this.groupPersonService.getGroupPersons(groupId)

        if (persons.length < 2) {
            throw new Error("Not enough participants for Secret Santa");
        }

        const shuffledPersons = this.shuffleArray(persons);

        const assignments: Record<string, string> = {};

        for (let i = 0; i < shuffledPersons.length; i++) {
            const gifter = shuffledPersons[i];
            const giftee = shuffledPersons[(i + 1) % shuffledPersons.length];
            await this.secretSantaRepository.create(gifter.id, giftee.id);
            assignments[gifter.name] = giftee.name;
        }
        return assignments;
    }

    private shuffleArray(array: GroupPersonDTO[]): GroupPersonDTO[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}