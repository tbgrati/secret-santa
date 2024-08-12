

export interface SecretSantaRepository{
    createSecretSanta(gifterId: string, gifteeId: string)
    findSecretSantasByGroupId(groupId: string)
}