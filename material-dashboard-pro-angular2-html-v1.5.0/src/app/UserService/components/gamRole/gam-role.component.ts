import { Component, OnInit } from '@angular/core';
import {GamRoleService} from '../../services/gamRole/gam-role.service';
import {Role} from '../../classes/gamRole/role';
import {Role_privileges} from '../../classes/gamRole/Role_privileges';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gam-role',
  templateUrl: './gam-role.component.html',
  styleUrls: ['./gam-role.component.scss']
})
export class GamRoleComponent implements OnInit {
    constructor(private api: GamRoleService,private route: Router) { }


    public isLoading: boolean = true;
    roleName:string;
    roleDescription:string;

    addRole: Role;

    submitForm(): void{
        /*
        if (!this.selectedPrivileges || this.selectedPrivileges.length == 0){
            alert('select the role')
            return;
        }
        */


        if (!this.roleName || !this.roleDescription) {
            swal("Missing Information","Please Enter All Required Information","error")

            return;
        }


        this.addRole = new Role();
        this.addRole.roleName = this.roleName;
        this.addRole.description = this.roleDescription;
        this.api.postRole(this.addRole).subscribe(role =>{
            swal("Success","Role Added Successfully","success")
            this.route.navigate(["/userService/gamRoleMange"]);
        },()=>{
            swal("Error ","Operation was not completed","error")
        });
    }


    ngOnInit() {
    }
}
