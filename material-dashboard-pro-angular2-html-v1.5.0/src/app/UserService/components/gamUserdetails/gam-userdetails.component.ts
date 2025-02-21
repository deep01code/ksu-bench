import {DoCheck, Component, OnInit} from '@angular/core';
import {UserWithRoles} from '../../classes/gamUser/userWithRoles';
import {GamRoleService} from '../../services/gamRole/gam-role.service';
import {GamUserService} from '../../services/gamUser/gamUser.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {Role} from '../../classes/gamRole/role';
import {Account_roles} from '../../classes/gamUser/account_roles';
import {User} from '../../classes/gamUser/user';
import {StructureService} from "../../services/structureServices/structure.service";
import {ManagerialUnit, UserRolesDTO} from "../../classes/managerialUnit";
import swal from "sweetalert2";


@Component({
  selector: 'app-gam-userdetails',
  templateUrl: './gam-userdetails.component.html',
  styleUrls: ['./gam-userdetails.component.scss']
})
export class GamUserdetailsComponent implements OnInit, DoCheck {

    public isLoading: boolean = true;
    userWithRole: User;
    updateRoleToUser: Account_roles;
    roles: Role[] = [];
    addRoles: Array<Role> = [];
    private sub:any;
    public addListA: Array<Role> = [];
    public addListB: Array<Role> = [];

    unitList:ManagerialUnit[]=[]
    username;
    constructor(private api: GamUserService,
                private  apiRole: GamRoleService,
                private route: ActivatedRoute,
                private _location: Location,
                public structureService:StructureService,
    ) {

        this.username = this.route.snapshot.paramMap.get('username')
        this.getUserUnits();

    }

    public roleList: Array<Role> = [];

    ngOnInit() {
        //this.getUserRoles();
        //this.getRolesList();





    }

    fetchTree(){
        let self=this;
        var zNodes = [

        ];
        var zTreeObj;
        var setting = {
            data: {
                key: {
                    title:"unitEnglishName",
                    name:"unitEnglishName",
                    children:"managerialUnits"
                },
                simpleData: {
                    enable: true
                }
            },
            callback: {
                /*beforeClick: this.beforeClick,*/
                onClick: (event, treeId, treeNode, clickFlag) =>{
                    //console.log("treeId==>"+treeId+" treeNore==>"+JSON.stringify(treeNode)+" clickFlage==>"+clickFlag+" event"+event);
                    // this.selectedUnit=treeNode as ManagerialUnit;

                    //  this.loadPaginationTables();





                    return (treeNode.click != false);
                },
                onCheck:(event, treeId, treeNode)=>{

                  if(treeNode.checked){
                    this.addManagerialUnit(treeNode)
                  }else{
                    this.removeManagerialUnit(treeNode)

                  }



        }
            },
            view:{showIcon:true},
            check: {
                enable: true,
                chkboxType:{Y:'s',N:'s'}
            },
        };

        //fetching zTree
        this.isLoading=true;
        this.structureService.getAllManagerialUnits().subscribe(
            (data)=>{


                //end of recursion

                zNodes=data as any[];
                this.checkIfUserHaveNode(zNodes as any[])

                // this.onInitUnit=data[0];
                zNodes.forEach( (item)=>{ item.open=true})
                $(document).ready(function(){
                    zTreeObj = $.fn.zTree.init($("#roles"), setting, zNodes);
                    //  zTreeObj.expandAll(false)
                });},

            err=>{},
            ()=>{this.isLoading=false;}

        );




    }


    addManagerialUnit(managerialUnit:ManagerialUnit){
        this.treeToList(managerialUnit)
    }
    removeManagerialUnit(managerialUnit:ManagerialUnit){
        this.removeFromTree(managerialUnit)
    }

    treeToList(managerialUnit:ManagerialUnit){
        var temp=JSON.parse(JSON.stringify(managerialUnit)) as ManagerialUnit;
        temp.managerialUnits=[];
        if(!this.containsUnit(managerialUnit)){
            this.unitList.push(temp as ManagerialUnit);
        }
        managerialUnit.managerialUnits.forEach( unit =>{
            this.treeToList(unit);
        })
    }
    removeFromTree(managerialUnit:ManagerialUnit){
        var temp=JSON.parse(JSON.stringify(managerialUnit)) as ManagerialUnit;
        temp.managerialUnits=[];
        if(this.containsUnit(managerialUnit)){
            this.unitList=this.unitList.filter(function(el) { return el.id != managerialUnit.id; });
        }
        managerialUnit.managerialUnits.forEach( unit =>{
            this.removeFromTree(unit);
        })
    }

    containsUnit(managerialUnit:ManagerialUnit){
        console.log("called")
        var found = false;
        for(var i = 0; i < this.unitList.length; i++) {
            if (this.unitList[i].id == managerialUnit.id) {
                found = true;
                break;
            }
        }
        return found;
    }


    updateUserUnits(){

        //username
        let userRolesDTO:UserRolesDTO = new UserRolesDTO();
        userRolesDTO.username=this.username;
        userRolesDTO.managerialUnitList=this.unitList;
        this.isLoading=true;
        this.api.updateUserUnits(userRolesDTO).subscribe(
            data =>{
                swal({
                    title: 'Done!',
                    text: 'Update Captured successfully',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
                this.fetchTree();
            },
            err=>{
                swal({
                    title: 'Error',
                    text: 'Internal Server Error',
                    type: 'error',
                    confirmButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                });

            },
            ()=>{this.isLoading=false;}
        )
    }


    //getUserUnits
    getUserUnits(){
        let userRolesDTO:UserRolesDTO = new UserRolesDTO();
        userRolesDTO.username=this.username;

        this.api.getUserUnits(userRolesDTO).subscribe(
            data =>{
                this.unitList= data as ManagerialUnit[]
                this.unitList.forEach( unit=>{ unit.managerialUnits=[]})
                this.fetchTree();
            },
            err=>{},
            ()=>{this.isLoading=false;}
        )
    }


     checkIfUserHaveNode(root:any[]){

        root.forEach( (node)=>{
            if(this.containsUnit(node)){
                node.checked=true;
                node.open=true;
            }

            if(node.managerialUnits!=null){
                node.managerialUnits.forEach( unit =>{
                    if(this.containsUnit(unit)){
                        unit.checked=true;
                        unit.open=true;
                    }
                    this.checkIfUserHaveNode(unit.managerialUnits);
                })
            }
        })


    }


























































    getUserRoles(): void {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            console.log(params)
            console.log(id)
            this.api.getSelecedUserById(id).subscribe(userData => {
                console.log(userData)
                this.userWithRole = userData;
//                this.roleList = Object.assign([], this.userWithRole);
                this.roleList = userData.roles;
            });
        });
    }

    getRolesList(): void {
        this.isLoading = true;
        this.apiRole.getRoles()
            .subscribe(data => {
                    this.roles = data
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }

    ngDoCheck(){
        this.checkRoles();
    }

    backClicked() {
        this._location.back();
    }

    checkRoles(){
        for(let i = 0; i < this.roleList.length; i++){
            for(let j = 0; j < this.roles.length; j++) {
                if (this.roles[j].roleName === this.roleList[i].roleName) {
                    this.roles.splice(j,1);
                }
            }
        }
    }

    addToListA(roleName,event: any){
        let index = this.addListA.indexOf(roleName);
        if(event === true ){
            this.addListA.push(roleName);
        } else if (event === false){
            this.addListA.splice(index,1);
        }
    }

    addToListB(roleName,event: any){
        let index = this.addListB.indexOf(roleName);
        if(event === true ){
            this.addListB.push(roleName);
        } else if (event === false){
            this.addListB.splice(index,1);
        }
    }

    removeFromListA(){
        for(let i = 0; i < this.addListA.length; i++){
            for(let j = 0; j < this.roleList.length; j++) {
                if (this.roleList[j].roleName === this.addListA[i].roleName) {
                    this.roles.push(this.roleList[j]);
                    this.roleList.splice(j,1);
                }
            }
        }
        this.addListA.length = 0;
    }

    removeFromListB(){
        for(let i = 0; i < this.addListB.length; i++){
            for(let j = 0; j < this.roles.length; j++) {
                if (this.roles[j].roleName === this.addListB[i].roleName) {
                    this.roleList.push(this.roles[j]);
                    this.roles.splice(j,1);
                }
            }
        }
        this.addListB.length = 0;
    }

    saveRoleToUser(): void{
        this.updateRoleToUser = new Account_roles();
        this.updateRoleToUser.user = new User();
        this.updateRoleToUser.roles = this.addRoles;
        this.updateRoleToUser.user.username = this.userWithRole.username;
        this.updateRoleToUser.user.password = this.userWithRole.password;
        this.updateRoleToUser.user.enabled = this.userWithRole.enabled;

        console.log(this.updateRoleToUser.user);

        for( let i = 0; i<this.roleList.length; i++){
            this.addRoles.push({
                id: this.roleList[i].id,
                roleName: this.roleList[i].roleName,
                description: this.roleList[i].description
            })
        }

        this.updateRoleToUser.roles = this.addRoles;
        this.api.postUpadteRolesToUser(this.updateRoleToUser).subscribe(user => {
            this.backClicked();
        });
    }
}
