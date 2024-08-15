import {prismaMock} from "./config/test-db";
import {CreateGroupDTO} from "../src/modules/group/dto";
import {GroupPersonRepositoryImpl} from "../src/modules/group/repository/group-person.repository.impl";
import {GroupRepositoryImpl} from "../src/modules/group/repository/group.repository.impl";
import {GroupServiceImpl} from "../src/modules/group/service/group.service.impl";
import {SecretSantaRepositoryImpl} from "../src/modules/secret-santa/repository/secret-santa.repository.impl";
import {SecretSantaServiceImpl} from "../src/modules/secret-santa/service/secret-santa.service.impl";
import {SecretSantaV1ServiceImpl} from "../src/modules/secret-santa/service/secret-santa-v1.service.impl";
import {groupService} from "../src/modules/group/controller/group.controller";


test('v1 should not assign anyone to themselves', async () => {
    const group = {
        id: '1',
        name: 'Group A'
    };

    const persons = [
        { id: 1, name: 'Person A' },
        { id: 2, name: 'Person B' },
        { id: 3, name: 'Person C' },
        { id: 4, name: 'Person D' }
    ];

    const groupDTO = new CreateGroupDTO();
    groupDTO.name = group.name;

    prismaMock.group.create.mockResolvedValue(group);

    const groupPersonRepository = new GroupPersonRepositoryImpl(prismaMock);
    const groupRepository = new GroupRepositoryImpl(prismaMock);
    const groupService = new GroupServiceImpl(groupRepository, groupPersonRepository);
    const secretSantaRepository = new SecretSantaRepositoryImpl(prismaMock);
    const secretSantaV1Service = new SecretSantaV1ServiceImpl(groupService, secretSantaRepository);

    // Mock getGroupPersons to return the list of persons
    jest.spyOn(groupPersonRepository, 'getGroupPersons').mockResolvedValue(persons);


    // Mock the createMany method to capture the generated pairs
    const generatedPairs: Array<{ gifter: string; giftee: string }> = [];
    jest.spyOn(secretSantaRepository, 'create').mockImplementation(async (data) => {
        generatedPairs.push(data);
        return Promise.resolve();
    });

    // Run the Secret Santa generation
    await secretSantaV1Service.generate(group.id);

    // Check that no one is assigned to themselves
    generatedPairs.forEach(pair => {
        expect(pair.gifter).not.toBe(pair.giftee);
    });

    // Ensure each person is assigned exactly once
    const gifters = generatedPairs.map(pair => pair.gifterId);
    const giftees = generatedPairs.map(pair => pair.gifteeId);
    expect(new Set(gifters).size).toBe(persons.length);
    expect(new Set(giftees).size).toBe(persons.length);
});