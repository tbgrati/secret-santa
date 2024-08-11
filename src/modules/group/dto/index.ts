import {IsNotEmpty, IsString} from 'class-validator'


export class CreateGroupDTO{
    @IsNotEmpty()
    @IsString()
    name!: string

}