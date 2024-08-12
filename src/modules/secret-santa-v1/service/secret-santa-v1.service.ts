

export interface SecretSantaV1Service{
    generate(groupId: string): Promise<Record<string,string>>
}