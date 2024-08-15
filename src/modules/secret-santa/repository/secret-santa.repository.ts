import {SecretSantaHistoryDTO} from "../dto";


export interface SecretSantaRepository{
    create(assignments: Record<string, string>)
    getGroupSecretSantasByYear(groupId: string, year: number): Promise<SecretSantaHistoryDTO[]>
    getSecretSantaHistoryByGroupId(groupId: string): Promise<SecretSantaHistoryDTO[]>
}