

export interface GroupPersonRepository{
    addPersonToGroup(personId: string, groupId: string)
    getGroupPersons(groupId: string);
}