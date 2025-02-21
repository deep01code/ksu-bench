import { Component, OnInit } from '@angular/core';
import {GamUserService} from '../../services/gamUser/gamUser.service';
import {User} from '../../classes/gamUser/user';
import {UserWithRoles} from '../../classes/gamUser/userWithRoles';
import swal from 'sweetalert2';
import {NameCount} from '../../../AlmService/classes/name-count';
import {Role} from '../../classes/gamRole/role';
import {GamRoleService} from '../../services/gamRole/gam-role.service';
import {Router, RouterModule, Routes} from '@angular/router';


@Component({
  selector: 'app-gam-user-mange',
  templateUrl: './gam-user-mange.component.html',
  styleUrls: ['./gam-user-mange.component.scss']
})
export class GamUserMangeComponent implements OnInit {

    public filter: string = '';
    public isLoading: boolean = true;
    userRoleList: User[];
    roles: Role[];
    userWithRole: User;



  constructor(private api: GamUserService,
              private  apiRole: GamRoleService,
              private route: Router
  ) { }


    getUsersList(): void {
        this.isLoading = true;
        this.api.getUsers()
            .subscribe(data => {
                this.userRoleList = data
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }

    getRolesList(): void {
        this.isLoading = true;
        this.apiRole.getRoles()
            .subscribe(data => {
                    //console.log(data);
                    //this.mAlert = data;
                    this.roles = data
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }

    getSelectedUser(id): void {
      this.isLoading = true;
      this.api.getSelecedUserById(id).subscribe(userData => {
         // console.log(userData);
          this.userWithRole = userData;
      });
    }

  ngOnInit() {
      this.getUsersList();
      this.getRolesList();
  }

  updateUserStatus(row){
      this.api.updateUserStatus(row).subscribe( userStatus =>{
          this.getUsersList();
      });
  }


    getUserDetails(user) {
        this.route.navigate(["/userService/gamUserMange/" + user.username]);
    }
}
