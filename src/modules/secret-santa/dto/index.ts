


export class SecretSantaHistoryDTO{
    constructor(secretSanta: SecretSantaHistoryDTO){
        this.gifter = secretSanta.gifter
        this.giftee = secretSanta.giftee
        this.year = secretSanta.year
    }

    gifter: string
    giftee: string
    year: number

}