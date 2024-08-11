import {CreateGroupDTO} from "../dto";


export interface GroupRepository{
    createGroup(data: CreateGroupDTO);
    findGroupById(id: string);
}

