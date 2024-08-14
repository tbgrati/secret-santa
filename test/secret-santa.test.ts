import {prismaMock} from "./config/test-db";
import {SecretSantaRepositoryImpl} from "../src/modules/secret-santa/repository/secret-santa.repository.impl";
import {SecretSantaServiceImpl} from "../src/modules/secret-santa/service/secret-santa.service.impl";
import {SecretSantaV1ServiceImpl} from "../src/modules/secret-santa/service/secret-santa-v1.service.impl";
import {groupService} from "../src/modules/group/controller/group.controller";
import {SecretSantaV2ServiceImpl} from "../src/modules/secret-santa/service/secret-santa-v2.service.impl";


// test('v1 generator doesnt assign anyone to themselves', async () => {
//     const people = [
//         { name: 'Person A' },
//         { name: 'Person B' },
//         { name: 'Person C' },
//         { name: 'Person D' }
//     ];
//     const group = { name: "Group A"}
//
//     prismaMock.person.createMany.mockResolvedValue({count: people.length});
//     prismaMock.group.create.mockResolvedValue(group);
//
//
//     const secretSantaRepository = new SecretSantaRepositoryImpl(prismaMock)
//     const secretSantaV1Service = new SecretSantaV1ServiceImpl(groupService,secretSantaRepository)
//
//     await expect(secretSantaV1Service.generate()).resolves.toEqual({
//
//     })
// })