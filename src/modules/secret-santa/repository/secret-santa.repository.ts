

export interface SecretSantaRepository{
    create(gifterId: string, gifteeId: string)
    getSecretSantasByGroupId(groupId: string)
}