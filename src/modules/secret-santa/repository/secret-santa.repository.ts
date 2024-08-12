

export interface SecretSantaRepository{
    create(gifterId: string, gifteeId: string)
    findSecretSantasByGroupId(groupId: string)
}