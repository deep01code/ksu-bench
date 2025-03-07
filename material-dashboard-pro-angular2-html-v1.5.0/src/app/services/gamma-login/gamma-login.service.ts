import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSdkService } from '../auth-sdk/auth-sdk.service';
import { AuthBody } from '../../gamma-login/auth-body';
import swal from 'sweetalert2';
import { RouteInfo } from '../../sidebar/sidebar.component';


export const ROUTES: RouteInfo[] = [
    /*{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/components',
        title: 'Reports',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'},
        ]
    },*/
    /*     {
            path: '/almService', roles: ['ROLE_ADMIN', 'ROLE_ALM'],
            title: 'Alm Reports',
            type: 'sub',
            icontype: 'apps',
            collapse: 'almService',
            children: [
                { path: 'CRsStatus', title: 'CRs Status', ab: 'CS' },
                { path: 'Defects', title: 'Defect', ab: 'DF' },
                { path: 'gam4', title: 'Executed TCs', ab: 'ET' },
                { path: 'gam91', title: 'Planed Release Date', ab: 'PRD' },
                { path: 'gam92', title: 'Planned VS. Actual', ab: 'PvA' }
            ]
        }, {
            path: '/attendanceService', roles: ['ROLE_ADMIN', 'ROLE_ATTENDANCE'],
            title: 'Attendance Reports',
            type: 'sub',
            icontype: 'apps',
            collapse: 'attendanceService',
            children: [
                { path: 'gam50', title: 'Role Monthly Cost', ab: 'RMC' },
                { path: 'gam51', title: 'Role Monthly Cost-Chart', ab: 'RMCC' },
                { path: 'gam52', title: 'Total Cost per year', ab: 'TC' },
                { path: 'gam64', title: '#Employee Site/OffSore', ab: 'ESO' },
                { path: 'gam238', title: 'Attendance Report', ab: 'AR' },
                { path: 'gam704', title: 'Generate Cost Report', ab: 'GCR' },
                { path: 'gam788', title: 'Attendance Cost Workflow', ab: 'ACW' },
                { path: 'programForm', title: 'Programs Management', ab: 'PM' }
            ]
        }, {
            path: '/employees',
            roles: ['ROLE_ADMIN', 'ROLE_ATTENDANCE'],
            title: 'Employees Service',
            type: 'sub',
            icontype: 'apps',
            collapse: 'employeeManagement',
            children: [
                { path: 'employees_management', title: 'Employee Management', ab: 'EM' },
                { path: 'exceptions', title: 'Exceptions Management', ab: 'EXM' },
                { path: 'view-exceptions', title: 'View Exceptions', ab: 'VX' },
            ]
        },
        {
            path: '/releaseService', roles: ['ROLE_ADMIN', 'ROLE_JIRA'],
            title: 'Release Management',
            type: 'sub',
            icontype: 'apps',
            collapse: 'releaseService',
            children: [
                { path: 'release', title: 'Releases', ab: '' },
            ]
        }
        , {
            path: '/jiraService', roles: ['ROLE_ADMIN', 'ROLE_JIRA'],
            title: 'Jira Reports',
            type: 'sub',
            icontype: 'apps',
            collapse: 'jiraService',
            children: [
                { path: 'gam133', title: 'Jira Repoert List', ab: 'JRL' },
            ]
        }, {
            path: '/SCA/wizard', roles: ['ROLE_ADMIN', 'ROLE_CONCEPT'],
            title: 'Service Concepts',
            type: 'link',
            icontype: 'content_paste',
        },  */
    {
        path: '/pst', roles: ['ROLE_ADMIN', 'ROLE_PST'],
        title: 'Employees',
        type: 'sub',
        icontype: 'apps',
        collapse: 'pstservice',
        children: [
           /* { path: 'generaldepartments', title: 'General Departments', ab: 'GD' },*/
            /*{ path: 'vendors', title: 'Vendors', ab: 'VN' },*/
            /*{ path: 'system-domains', title: 'System Domain', ab: 'SD' },*/
            /*{ path: 'projects', title: 'Project', ab: 'PJ' },*/
            { path: 'employee', title: 'Employees', ab: 'EM' },
            { path: 'report', title: 'Reports', ab: 'RP' },
            { path: 'site-update', title: 'Site Update', ab: 'SU' }

        ]
    },
      {
          path: '/userService', roles: ['ROLE_ADMIN'],
          title: 'System Management',
          type: 'sub',
          icontype: 'account_box',
          collapse: 'userService',
          children: [
              { path: 'reports', title: 'Graphs & Data', ab: 'GD' },
              { path: 'gamUser', title: 'Create New User', ab: 'CNU' },
              { path: 'gamUserMange', title: 'Manage Users', ab: 'MU' },
              { path: 'lov', title: 'List Of Values', ab: 'LO' },
              { path: 'structure', title: 'Structure Module', ab: 'SM' },
              /*{ path: 'listAgreement', title: 'Agreements', ab: 'AG' },*/
              { path: 'listDomain', title: 'Domain Module (1)', ab: 'DM' },
              { path: 'listVendor', title: 'Vendors & Card Rates (2)', ab: 'VC' },
              { path: 'listFin', title: 'Financial Numbers (3)', ab: 'FN' },
              { path: 'listPO', title: 'POs', ab: 'PO' },
              { path: 'listError', title: 'Info & Errors', ab: 'ERR' },


/*              { path: 'gamRole', title: 'Create New Role', ab: 'CNR' },
              { path: 'gamRoleMange', title: 'Manage Roles', ab: 'MR' },*/
          ]
      },

    /*{
          path: '/automationService', roles: ['ROLE_ADMIN'],
          title: 'Automation',
          type: 'sub',
          icontype: 'account_box',
          collapse: 'automationService',
          children: [
              { path: 'gam881', title: 'Update Product Price', ab: 'CNU' },
          ]
      }*/
];


@Injectable()
export class GammaLoginService {

    urlToRedirectTo: string;
    body = new AuthBody();


    constructor(private router: Router, private authSDK: AuthSdkService) { }

    setUrlAfterLogin(url: string) {
        this.urlToRedirectTo = url;
    }

    login(username, password) {

        this.body.grant_type = "password"
        this.body.scope = "webclient"
        this.body.username = username
        this.body.password = password
        return this.authSDK.authenticate(this.body)
            .subscribe((data) => {
                    this.getRoles()

                    setTimeout(() => {
                        if (this.hasAnyRole(["ROLE_ADMIN","ROLE_PST"])) { this.router.navigate(['/']) }
                        if (this.hasAnyRole(["ROLE_ALM"])) { this.router.navigate(['/almService/gam4']) }
                        if (this.hasAnyRole(["ROLE_JIRA"])) { this.router.navigate(['/jiraService/gam133']) }
                        if (this.hasAnyRole(["ROLE_ATTENDANCE"])) { this.router.navigate(['/attendanceService/gam50']) }
                        if (this.hasAnyRole(["ROLE_CONCEPT"])) { this.router.navigate(['/SCA/wizard']) }
                        if (this.urlToRedirectTo) {
                            this.router.navigate([this.urlToRedirectTo]);
                            this.urlToRedirectTo = null;
                        }
                        this.generateMenuItems();

                    }, 100)

                },

                (error) => {
                    //console.log(error)
                    swal("Unauthenticated", "username or password is wrong!", "error")
                }

            )
    }

    logout() {
        this.authSDK.logout();
    }

    isAuthenticated(): boolean {
        return (localStorage.getItem("access_token") != null) ? true : false;
    }

    redirectUrl() {
        this.authSDK
        this.router.navigate([this.urlToRedirectTo]);
    }

    getUserName(): string {
        return this.authSDK.getUserName();
    }

    getToken(){
        return this.authSDK.getToken();
    }

    /*
        hasRoles(list:string[]):boolean{
          var result:boolean
          this.authSDK.hasRoles(list).subscribe((data)=>{
               result=data;
           });

          return result;
        }
    */


    getRoles() {
        return this.authSDK.getRoles()
    }



    hasAnyRole(list: any[]): boolean {
        var result: boolean = false;

        if (list.length > 0) {
            this.getRoles().forEach(function (role) {
                list.forEach(function (item) {
                 //   console.log(role)
                 //   console.log(item)
                 //   console.log(role.toString() == item.toString())
                    if (role.toString() == item.toString()) { result = true }
                })
            })
        }

        return result;
    }


    public muneItems: any[]

    generateMenuItems() {
        var temp: any[]

        temp = []
        if (this.isAuthenticated()) {

            for (var i = 0; i < ROUTES.filter(menuItem => menuItem).length; i++) {
                // console.log(this.hasAnyRole(ROUTES.filter(menuItem => menuItem)[i].roles))

                if (this.hasAnyRole(ROUTES.filter(menuItem => menuItem)[i].roles)) {
                    temp.push(ROUTES.filter(menuItem => menuItem)[i])
                }
            }

        }

        this.muneItems = temp;



    }
}
