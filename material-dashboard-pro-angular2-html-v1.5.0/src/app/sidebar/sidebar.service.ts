import { Injectable } from '@angular/core';
import {GammaLoginService} from '../services/gamma-login/gamma-login.service';
import {RouteInfo} from './sidebar.component';

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
    {
        path: '/almService',roles:['ROLE_ADMIN','ROLE_ALM'],
        title: 'Alm Reports',
        type: 'sub',
        icontype: 'apps',
        collapse: 'almService',
        children: [
            {path: 'CRsStatus', title: 'CRs Status', ab:'CS'},
            {path: 'Defects', title: 'Defect', ab:'DF'},
            {path: 'gam4', title: 'Executed TCs', ab:'ET'},
            {path: 'gam91', title: 'Planed Release Date', ab:'PRD'},
            {path: 'gam92', title: 'Planned VS. Actual', ab:'PvA'}
        ]
    }, {
        path: '/attendanceService',roles:['ROLE_ADMIN','ROLE_ATTENDANCE'],
        title: 'Attendance Reports',
        type: 'sub',
        icontype: 'apps',
        collapse: 'attendanceService',
        children: [
            { path: 'gam50', title: 'Role Monthly Cost', ab:'RMC' },
            { path: 'gam51', title: 'Role Monthly Cost-Chart', ab:'RMCC' },
            { path: 'gam52', title: 'Total Cost per year', ab:'TC' },
            { path: 'gam64', title: '#Employee Site/OffSore', ab:'ESO' },
            { path: 'gam238', title: 'Attendance Report', ab:'AR' },
            { path: 'gam788', title: 'Attendance Cost Workflow', ab:'AR' },

        ]
    },
    {
        path:'/releaseService',roles:['ROLE_ADMIN','ROLE_JIRA'],
        title:'Release Management',
        type: 'sub',
        icontype: 'apps',
        collapse: 'releaseService',
        children:[
            {path: 'release', title:'releases',ab:'R'}
        ]
    }
    ,{
        path: '/jiraService',roles:['ROLE_ADMIN','ROLE_JIRA'],
        title: 'Jira Reports',
        type: 'sub',
        icontype: 'apps',
        collapse: 'jiraService',
        children: [
            { path: 'gam133', title: 'Jira Repoert List', ab:'JRL' },
        ]
    }, {
        path: '/SCA/wizard',roles:['ROLE_ADMIN'],
        title: 'Service Concepts',
        type: 'link',
        icontype: 'content_paste',
    },{
        path: '/userService', roles:['ROLE_ADMIN'],
        title: 'User Management',
        type: 'sub',
        //icontype: 'account_box',
        icontype: 'apps',
        collapse: 'userService',
        children:[
            { path: 'gamUser', title: 'Create New User', ab:'CNU' },
        ]
    }
];


@Injectable()
export class SidebarService {

  constructor(private auth:GammaLoginService) { }

  public muneItems:any[]

  generateMenuItems(){
    var temp:any[]

    temp=[]
    if(this.auth.isAuthenticated()){

        for(var i=0;i<ROUTES.filter(menuItem => menuItem).length;i++){
            console.log(this.auth.hasAnyRole(ROUTES.filter(menuItem => menuItem)[i].roles)+' the roles are '+ROUTES.filter(menuItem => menuItem)[i].roles)

            if(this.auth.hasAnyRole(ROUTES.filter(menuItem => menuItem)[i].roles)){
                temp.push(ROUTES.filter(menuItem => menuItem)[i])
            }
        }

    }

    this.muneItems=temp;

    }




}
