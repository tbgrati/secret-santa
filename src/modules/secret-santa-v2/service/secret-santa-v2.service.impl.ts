import {SecretSantaV2Service} from "./secret-santa-v2.service";
import {GroupPersonRepositoryImpl} from "../../group/repository/group-person.repository.impl";
import {SecretSantaRepositoryImpl} from "../../secret-santa/repository/secret-santa.repository.impl";

type Pairing = {
    [year: string]: {
        [personA: string]: string;
    };
};


export class SecretSantaV2ServiceImpl implements SecretSantaV2Service{
    constructor(
        private groupPersonRepository: GroupPersonRepositoryImpl,
        private secretSantaRepository: SecretSantaRepositoryImpl
    ) {}

    private wasDrawnPreviously(gifter: string, giftee: string,santaHistory: Record<string, Record<string,string>>): boolean{

    }

    async generate(groupId: string) {
        const yearDifLimit = 1
        const yearMinLimit = (new Date().getFullYear()) - 1;
        const santaHistory = await this.secretSantaRepository.getGroupSecretSantasByYear(groupId, yearMinLimit)
        const groupPersons = await this.groupPersonRepository.getGroupPersons(groupId)

        const gifters = [...groupPersons];
        const giftees = [...groupPersons];

        for (let i = 0; i < gifters.length; i++) {
            const gifter = gifters[i];
            let giftee = giftees[i];

            if (this.wasDrawnPreviously(gifter, giftee, santaHistory)) {
                giftee = giftees[i + 1];
            }

            await this.secretSantaRepository.create(gifter.id, giftee.id);
        }

        // asign random gifters to giftees checking if it wasDrawnPreviosly, if it was just try with the next value








    }

}