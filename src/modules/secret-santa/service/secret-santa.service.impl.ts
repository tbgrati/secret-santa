import {SecretSantaService} from "./secret-santa.service";
import {SecretSantaRepository} from "../repository/secret-santa.repository";


export class SecretSantaServiceImpl implements SecretSantaService{

    constructor(private secretSantaRepository: SecretSantaRepository) {}
    async getHistory(groupId: string) {
        const secretSantas = await this.secretSantaRepository.getSecretSantaHistoryByGroupId(groupId)

        const result: Record<string, Record<string, string>> = {};

        secretSantas.forEach(secretSanta => {
            const { year, gifter, giftee } = secretSanta;

            if (!result[year]) {
                result[year] = {};
            }

            result[year][gifter] = giftee;
        });

        return result;
    }

}