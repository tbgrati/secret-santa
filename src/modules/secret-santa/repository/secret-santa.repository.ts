import {SecretSantaHistoryDTO} from "../dto";


export interface SecretSantaRepository{
    create(gifterId: string, gifteeId: string)
    getSecretSantaHistoryByGroupId(groupId: string): Promise<SecretSantaHistoryDTO[]>
}