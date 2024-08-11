import { PrismaClient } from '@prisma/client';
import {PersonRepository} from "./person.repository";
import {CreatePersonDTO} from "../dto";

export class PersonRepositoryImpl implements PersonRepository{

    constructor(private db: PrismaClient) {}
    async createPerson(data: CreatePersonDTO) {
        return this.db.person.create({
            data
        });
    }
}


