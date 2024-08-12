import {SecretSantaService} from "./secret-santa.service";
import {SecretSantaRepository} from "../repository/secret-santa.repository";


export class SecretSantaServiceImpl implements SecretSantaService{

    constructor(private secretSantaRepository: SecretSantaRepository) {}
    async getHistory(groupId: string) {
        return this.secretSantaRepository.findSecretSantasByGroupId(groupId)
    }

}