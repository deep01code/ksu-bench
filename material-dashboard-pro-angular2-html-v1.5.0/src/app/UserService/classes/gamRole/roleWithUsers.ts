import {User} from '../gamUser/user';

export class RoleWithUsers {
    roleId:number;
    name:string;
    description:string;
    users: User[];
}
