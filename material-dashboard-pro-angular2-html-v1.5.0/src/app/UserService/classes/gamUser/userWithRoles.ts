import {Role} from '../gamRole/role';

export class UserWithRoles {
  /*  id: number;
    username: string;
    password: string;
    enabled: string;
    roles: Role[];*/

    username;
    password;
     accountNonExpired;
     accountNonLocked;
     credentialsNonExpired;
     enabled;
    roles:Role[];
}
