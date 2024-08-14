import {SecretSantaHistoryDTO} from "../dto";


export interface SecretSantaRepository{
    create(gifterId: string, gifteeId: string)
    getGroupSecretSantasByYear(groupId: string, year: number): Promise<SecretSantaHistoryDTO[]>
    getSecretSantaHistoryByGroupId(groupId: string): Promise<SecretSantaHistoryDTO[]>
}