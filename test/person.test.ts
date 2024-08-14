import {prismaMock} from "./config/test-db";
import {PersonRepositoryImpl} from "../src/modules/person/repository/person.repository.impl";
import {PersonServiceImpl} from "../src/modules/person/service/person.service.impl";
import {CreatePersonDTO} from "../src/modules/person/dto";


test('should create new person', async () => {
    const person = {
        id: '1',
        name: 'Person A'
    }
    const personDTO = new CreatePersonDTO();
    personDTO.name = person.name;

    prismaMock.person.create.mockResolvedValue(person)

    const personRepository = new PersonRepositoryImpl(prismaMock)
    const personService = new PersonServiceImpl(personRepository)

    await expect(personService.createPerson(personDTO)).resolves.toEqual({
        id: '1',
        name: 'Person A'
    })
})