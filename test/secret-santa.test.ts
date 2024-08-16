import {prismaMock} from "./config/test-db";
import {CreateGroupDTO} from "../src/modules/group/dto";
import {GroupPersonRepositoryImpl} from "../src/modules/group/repository/group-person.repository.impl";
import {GroupRepositoryImpl} from "../src/modules/group/repository/group.repository.impl";
import {GroupServiceImpl} from "../src/modules/group/service/group.service.impl";
import {SecretSantaRepositoryImpl} from "../src/modules/secret-santa/repository/secret-santa.repository.impl";
import {SecretSantaServiceImpl} from "../src/modules/secret-santa/service/secret-santa.service.impl";
import {SecretSantaV1ServiceImpl} from "../src/modules/secret-santa/service/secret-santa-v1.service.impl";
import {SecretSantaV2ServiceImpl} from "../src/modules/secret-santa/service/secret-santa-v2.service.impl";


test('v1 should not assign anyone to themselves', async () => {

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
        },
        {
            id: '3',
            person: {
                name: 'Person C'
            }
        },
        {
            id: '4',
            person: {
                name: 'Person D'
            }
        }
    ];
    prismaMock.groupPerson.findMany.mockResolvedValue(groupPersons);

    const groupPersonRepository = new GroupPersonRepositoryImpl(prismaMock);
    const groupRepository = new GroupRepositoryImpl(prismaMock);
    const groupService = new GroupServiceImpl(groupRepository, groupPersonRepository);
    const secretSantaRepository = new SecretSantaRepositoryImpl(prismaMock);
    const secretSantaV1Service = new SecretSantaV1ServiceImpl(groupService, secretSantaRepository);

    const assignations = await secretSantaV1Service.generate('test');

    expect( Object.keys(assignations).length == groupPersons.length).toBeTruthy();
    expect(checkNoKeyEqualsValue(assignations)).toBeTruthy();
});

test('v2 should not assign anyone to themselves or from last year', async () => {

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
        },
        {
            id: '3',
            person: {
                name: 'Person C'
            }
        },
        {
            id: '4',
            person: {
                name: 'Person D'
            }
        }
    ];

    const mockSecretSantas = [
        {
            year: 2023,
            gifter: {
                person: {
                    name: 'Person A',
                },
            },
            giftee: {
                person: {
                    name: 'Person B',
                },
            },
        },
        {
            year: 2023,
            gifter: {
                person: {
                    name: 'Person B',
                },
            },
            giftee: {
                person: {
                    name: 'Person C',
                },
            },
        },
        {
            year: 2023,
            gifter: {
                person: {
                    name: 'Person C',
                },
            },
            giftee: {
                person: {
                    name: 'Person D',
                },
            },
        },
        {
            year: 2023,
            gifter: {
                person: {
                    name: 'Person D',
                },
            },
            giftee: {
                person: {
                    name: 'Person A',
                },
            },
        },
    ];


    prismaMock.groupPerson.findMany.mockResolvedValue(groupPersons);
    prismaMock.secretSanta.findMany.mockResolvedValue(mockSecretSantas);

    const groupPersonRepository = new GroupPersonRepositoryImpl(prismaMock);
    const groupRepository = new GroupRepositoryImpl(prismaMock);
    const groupService = new GroupServiceImpl(groupRepository, groupPersonRepository);
    const secretSantaRepository = new SecretSantaRepositoryImpl(prismaMock);
    const secretSantaV2Service = new SecretSantaV2ServiceImpl(groupService, secretSantaRepository);

    const assignations = await secretSantaV2Service.generate('test');

    expect( Object.keys(assignations).length == groupPersons.length).toBeTruthy();
    expect(checkNoKeyEqualsValue(assignations)).toBeTruthy();
    expect(checkNoRepeatedPairs(assignations, mockSecretSantas)).toBeTruthy();
});

function checkNoRepeatedPairs(assignations: Record<string, string>, pastAssignations: Array<{ gifter: { person: { name: string } }, giftee: { person: { name: string } } }>): boolean {
    for (const [gifter, giftee] of Object.entries(assignations)) {
        for (const pastPair of pastAssignations) {
            if (pastPair.gifter.person.name === gifter && pastPair.giftee.person.name === giftee) {
                return false;
            }
        }
    }
    return true;
}
function checkNoKeyEqualsValue(record: Record<string, string>): boolean {
    for (const key in record) {
        if (record[key] === key) {
            return false;
        }
    }
    return true;
}