import {IsNotEmpty, IsString} from 'class-validator'


export class CreateGroupDTO{
    @IsNotEmpty()
    @IsString()
    name!: string
}

export class GroupPersonDTO{
    id: string
    name: string
}