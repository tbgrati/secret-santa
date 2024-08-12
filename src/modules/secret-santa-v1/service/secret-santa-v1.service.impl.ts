import {SecretSantaV1Service} from "./secret-santa-v1.service";
import {GroupPersonRepository} from "../../group/repository/group-person.repository";
import {SecretSantaRepository} from "../../secret-santa/repository/secret-santa.repository";

interface Person {
    personId: string;
}

export class SecretSantaV1ServiceImpl implements SecretSantaV1Service {

    constructor(
        private groupPersonRepository: GroupPersonRepository,
        private secretSantaRepository: SecretSantaRepository
    ) {}
    async generate(groupId: string): Promise<Record<string,string>> {
        const persons = await this.groupPersonRepository.getGroupPersons(groupId)

        if (persons.length < 2) {
            throw new Error("Not enough participants for Secret Santa");
        }

        const shuffledPersons = this.shuffleArray(persons);

        const assignments: Record<string, string> = {};

        for (let i = 0; i < shuffledPersons.length; i++) {
            const gifter = shuffledPersons[i];
            const giftee = shuffledPersons[(i + 1) % shuffledPersons.length];
            console.log(gifter,giftee)
            await this.secretSantaRepository.create(gifter, giftee);
            assignments[gifter] = giftee;
        }

        return assignments;
    }

    private shuffleArray(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}