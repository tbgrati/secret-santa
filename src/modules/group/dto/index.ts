import {IsNotEmpty, IsString} from 'class-validator'


export class CreateGroupDTO{
    @IsNotEmpty()
    @IsString()
    name!: string
}

export class GroupPersonDTO{
    constructor(groupPerson: GroupPersonDTO){
        this.id = groupPerson.id
        this.name = groupPerson.name
    }

    id: string
    name: string
}

