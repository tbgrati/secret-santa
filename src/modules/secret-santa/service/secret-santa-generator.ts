

export interface SecretSantaGeneratorService{
    generate(groupId:string): Promise<Record<string,string>>
}