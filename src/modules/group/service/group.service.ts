import {CreateGroupDTO} from "../dto";


export interface GroupService {
    createGroup(data: CreateGroupDTO)
    addPersonToGroup(personId: string, groupId: string)
}

