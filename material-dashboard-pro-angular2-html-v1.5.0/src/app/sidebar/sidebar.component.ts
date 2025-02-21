import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {GammaLoginService} from '../services/gamma-login/gamma-login.service';
import {Router} from '@angular/router';
import {ROUTES, SidebarService} from './sidebar.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    roles:string[]
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
//This is the defalut slidebar
/*
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/components',
        title: 'Components',
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
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }
];
*/

/*
export const ROUTES: RouteInfo[] = [
    /!*{
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
    },*!/
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
        ]
    }, {
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
    }
];
*/


@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private router:Router,public auth:GammaLoginService) {
    }


    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
         this.menuItems =this.auth.muneItems;

           }





    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }




}
