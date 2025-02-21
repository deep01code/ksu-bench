import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GamUserService} from '../../services/gamUser/gamUser.service';

import {User} from '../../classes/gamUser/user';
import {Role} from '../../classes/gamRole/role';
import {GamRoleService} from '../../services/gamRole/gam-role.service';
import {Account_roles} from '../../classes/gamUser/account_roles';
import {Router} from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-gam-user',
  templateUrl: './gam-user.component.html',
  styleUrls: ['./gam-user.component.scss']
})
export class GamUserComponent implements OnInit {


    usersList: User[];
    addRoleToUser: Account_roles;

    user: User;
    roles:string[];
    rolesList: Role[];

    username:string;
    password:string;

    selectedRoles:Role[];
    public isLoading: boolean = true;

    constructor(private router:Router,private api: GamUserService, private roleApi: GamRoleService) { }

    getUsersList(): void {
        this.isLoading = true;
        this.api.getUsers()
            .subscribe(data => {
                    this.usersList = data
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }

    getRolesList(): void {
        this.isLoading = true;
        this.roleApi.getRoles()
            .subscribe(data => {
                    this.rolesList = data

                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }

    submitForm(): void{
        if (!this.selectedRoles || this.selectedRoles.length == 0 ||
            !this.username || !this.password){
            //this.selectedRoles = this.rolesList;
           swal("Missing Information","Please Enter All Required Information","error")
            return;
        }




        this.addRoleToUser = new Account_roles();
        this.addRoleToUser.user = new User();
        this.addRoleToUser.user.username = this.username;
        this.addRoleToUser.user.password = this.password;
        this.addRoleToUser.user.enabled = "true";

        this.addRoleToUser.roles = this.selectedRoles;
        let account_role = [];
        for( let i = 0; i<this.selectedRoles.length; i++){
            account_role.push({
                roleId: this.selectedRoles[i].id,
                NAME: this.selectedRoles[i].roleName,
                description: this.selectedRoles[i].description
            })
        }


       // this.addRoleToUser.role = account_role;
        this.api.postUser(this.addRoleToUser).subscribe(user =>{
            swal("Success","User was created","success")
            this.selectedRoles=[]
            this.username='';this.password='';
            this.router.navigate(["/userService/gamUserMange"]);
        },()=>{
            swal("Error ","Operation was not completed","error")

        });
    }


    ngOnInit() {
        this.getUsersList();
        this.getRolesList();
  }

    trim(roleName: string) {
        return roleName.trim()
    }
}
