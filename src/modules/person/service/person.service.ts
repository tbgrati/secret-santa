import {CreatePersonDTO} from "../dto";

export interface PersonService {
    createPerson(data: CreatePersonDTO)
}

