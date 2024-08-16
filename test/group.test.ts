import {prismaMock} from "./config/test-db";
import {CreateGroupDTO, GroupPersonDTO} from "../src/modules/group/dto";
import {GroupRepositoryImpl} from "../src/modules/group/repository/group.repository.impl";
import {GroupServiceImpl} from "../src/modules/group/service/group.service.impl";
import {GroupPersonRepositoryImpl} from "../src/modules/group/repository/group-person.repository.impl";


test('should create new group', async () => {
    const group = {
        id: '1',
        name: 'Group A'
    }
    const groupDTO = new CreateGroupDTO();
    groupDTO.name = group.name;

    prismaMock.group.create.mockResolvedValue(group)

    const groupPersonRepository = new GroupPersonRepositoryImpl(prismaMock)
    const groupRepository = new GroupRepositoryImpl(prismaMock)
    const groupService = new GroupServiceImpl(groupRepository,groupPersonRepository)

    await expect(groupService.createGroup(groupDTO)).resolves.toEqual({
        id: '1',
        name: 'Group A'
    })
})

test('should get persons from group by groupId', async () => {
    const groupId = '1';

    const group = {
        id: '1',
        name: 'Group A'
    }

    const groupPersons = [
        {
            id: '1',
            person: {
                name: 'Person A'
            }
        },
        {
            id: '2',
            person: {
                name: 'Person B'
            }
        }
    ];

    const expectedGroupPersonsDTO = groupPersons.map(gp => new GroupPersonDTO({
        id: gp.id,
        name: gp.person.name
    }));

    prismaMock.groupPerson.findMany.mockResolvedValue(groupPersons);
    prismaMock.group.findUnique.mockResolvedValue(group)

    const groupPersonRepository = new GroupPersonRepositoryImpl(prismaMock);
    const groupRepository = new GroupRepositoryImpl(prismaMock);
    const groupService = new GroupServiceImpl(groupRepository, groupPersonRepository);

    await expect(groupService.getGroupPersons(groupId)).resolves.toEqual(expectedGroupPersonsDTO);
});

test('should add person to group', async () => {
    const group = {
        id: '1',
        name: 'Group A'
    }
    const person = {
        id: '1',
        name: 'Person A'
    }

    const groupPerson = {
        groupId: '1',
        personId: '1'
    }

    prismaMock.group.findUnique.mockResolvedValue(group)
    prismaMock.groupPerson.create.mockResolvedValue(groupPerson)

    const groupPersonRepository = new GroupPersonRepositoryImpl(prismaMock)
    const groupRepository = new GroupRepositoryImpl(prismaMock)
    const groupService = new GroupServiceImpl(groupRepository,groupPersonRepository)

    await expect(groupService.addPersonToGroup(person.id, group.id)).resolves.toEqual({
        personId: '1',
        groupId: '1'
    })
})

