import {PersonService} from "./person.service";
import {PersonRepository} from "../repository/person.repository";
import {CreatePersonDTO} from "../dto";


export class PersonServiceImpl implements PersonService{
    constructor(private personRepository: PersonRepository) {}
    async createPerson(data: CreatePersonDTO) {
        return await this.personRepository.createPerson(data);
    }
}
