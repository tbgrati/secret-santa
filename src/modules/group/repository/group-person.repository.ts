import {GroupPersonDTO} from "../dto";


export interface GroupPersonRepository{
    addPersonToGroup(personId: string, groupId: string)
    getGroupPersons(groupId: string): Promise <GroupPersonDTO[]>;
}