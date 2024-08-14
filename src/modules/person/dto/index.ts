import {IsNotEmpty, IsString} from 'class-validator'


export class CreatePersonDTO{
    @IsNotEmpty()
    @IsString()
    name!: string
}