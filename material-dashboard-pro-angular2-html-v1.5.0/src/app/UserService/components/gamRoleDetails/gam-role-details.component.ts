import {Component, DoCheck, OnInit} from '@angular/core';
import {Account_roles} from '../../classes/gamUser/account_roles';
import {Location} from '@angular/common';
import {Role} from '../../classes/gamRole/role';
import {GamRoleService} from '../../services/gamRole/gam-role.service';
import {GamUserService} from '../../services/gamUser/gamUser.service';
import {User} from '../../classes/gamUser/user';
import {UserWithRoles} from '../../classes/gamUser/userWithRoles';
import {RoleWithUsers} from '../../classes/gamRole/roleWithUsers';
import {Role_accounts} from '../../classes/gamRole/Role_accounts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gam-role-details',
  templateUrl: './gam-role-details.component.html',
  styleUrls: ['./gam-role-details.component.scss']
})
export class GamRoleDetailsComponent implements OnInit , DoCheck{

    public isLoading: boolean = true;
    roleWithUsers: RoleWithUsers;
    updateUserToRole: Role_accounts;
    users: User[] = [];
    addUsers: User[] = [];
    private sub:any;

    public addListA: Array<User> = [];
    public addListB: Array<User> = [];


    constructor(private api: GamUserService,
                private  apiRole: GamRoleService,
                private route: ActivatedRoute,
                private _location: Location
    ) { }
    public userList: Array<User> = [];

    ngOnInit() {
        this.getRoleUsers();
        this.getUsersList();
    }

    getRoleUsers(): void {
        this.sub = this. route.params.subscribe(params => {
            let id = params['roleId'];
            this.apiRole.getSelecedRoleByIdwithUser(id).subscribe(roleData => {
                console.log(roleData)
                this.roleWithUsers = roleData;
                this.userList = Object.assign([],this.roleWithUsers.users);
            });
        });
    }

    getUsersList(): void {
        this.isLoading = true;
        this.api.getUserswithOutRole().subscribe(data => {
            this.users = data;
            this.isLoading = false;
        },(error) => {
            this.isLoading = false;
        });
    }

    ngDoCheck(){
        this.checkUsers();
    }

    backClicked() {
        this._location.back();
    }

    checkUsers(){
        for(let i = 0; i < this.userList.length; i++){
            for(let j = 0; j < this.users.length; j++) {
                if (this.users[j].username === this.userList[i].username) {
                    this.users.splice(j,1);
                }
            }
        }
    }

    addToListA(user,event: any){
        let index = this.addListA.indexOf(user);
        if(event === true ){
            this.addListA.push(user);
        } else if (event === false){
            this.addListA.splice(index,1);
        }
    }

    addToListB(userName,event: any){
        let index = this.addListB.indexOf(userName);
        if(event === true ){
            this.addListB.push(userName);
        } else if (event === false){
            this.addListB.splice(index,1);
        }
    }

    removeFromListA(){
        for(let i = 0; i < this.addListA.length; i++){
            for(let j = 0; j < this.userList.length; j++) {
                if (this.userList[j].username === this.addListA[i].username) {
                    this.users.push(this.userList[j]);
                    this.userList.splice(j,1);
                }
            }
        }
        this.addListA.length = 0;
    }

    removeFromListB(){
        for(let i = 0; i < this.addListB.length; i++){
            for(let j = 0; j < this.users.length; j++) {
                if (this.users[j].username === this.addListB[i].username) {
                    this.userList.push(this.users[j]);
                    this.users.splice(j,1);
                }
            }
        }
        this.addListB.length = 0;
    }

    saveRoleToUser(): void{
        this.updateUserToRole = new Role_accounts();
        this.updateUserToRole.role = new Role();
        this.updateUserToRole.user = this.addUsers;

        this.updateUserToRole.role.id = this.roleWithUsers.roleId;
        this.updateUserToRole.role.roleName = this.roleWithUsers.name;
        this.updateUserToRole.role.description = this.roleWithUsers.description;

        for( let i = 0; i<this.userList.length; i++){
            this.addUsers.push({

                username: this.userList[i].username,
                password: this.userList[i].password,
                enabled: this.userList[i].enabled,
                roles:this.userList[i].roles
            })
        }


        this.updateUserToRole.user = this.addUsers;
        this.apiRole.postUpadteUsersToRole(this.updateUserToRole).subscribe(user => {
            this.backClicked();
        });
    }
}
