import { Component, OnInit } from '@angular/core';
import {UserWithRoles} from '../../classes/gamUser/userWithRoles';
import {GamUserService} from '../../services/gamUser/gamUser.service';
import {Role} from '../../classes/gamRole/role';
import {GamRoleService} from '../../services/gamRole/gam-role.service';
import {RoleWithUsers} from '../../classes/gamRole/roleWithUsers';
import {User} from '../../classes/gamUser/user';

@Component({
  selector: 'app-gam-role-mange',
  templateUrl: './gam-role-mange.component.html',
  styleUrls: ['./gam-role-mange.component.scss']
})
export class GamRoleMangeComponent implements OnInit {

    public filter: string = '';
    public isLoading: boolean = true;
    roleWithUsers: RoleWithUsers[];
    users: User[];

    constructor(private api: GamUserService,private  apiRole: GamRoleService) { }


    getRolesList(): void {
        this.isLoading = true;
        this.apiRole.getRolesWithUsers()
            .subscribe(data => {
                    this.roleWithUsers = data
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }

    getUser(): void {
        this.isLoading = true;
        this.api.getUserswithOutRole()
            .subscribe(data => {
                    this.users = data
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }

    ngOnInit() {
        this.getRolesList();
    }
}
