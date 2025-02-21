import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AttendanceServiceModule} from './AttendanceService/attendance-service.module';

import {GammaLoginComponent} from './gamma-login/gamma-login.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {RoleGaurdService} from './services/auth-guard/role-gaurd.service';
import {EmployeeManagementModule} from './EmployeeManagment/employee-management.module';
import { PstModule } from './PST/pst.module';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'pst',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,

        children: [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'pst',
                loadChildren: './PST/pst.module#PstModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],
            }, {
                path: 'almService',
                loadChildren: './AlmService/alm-service.module#AlmServiceModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],

            }, {
                path: 'automationService',
                loadChildren: './automation/automation.module#AutomationModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],

            }, {
                path: 'attendanceService',
                loadChildren: './AttendanceService/attendance-service.module#AttendanceServiceModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],

            }, {
                path: 'employees',
                loadChildren: './EmployeeManagment/employee-management.module#EmployeeManagementModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],
            }, {
                path: 'jiraService',
                loadChildren: './JiraService/jira-service.module#JiraServiceModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],
            }, {
                path: 'SCA',
                loadChildren: './SCAService/SCA-service.module#SCAServiceModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],

            }, {
                path: 'plm',
                loadChildren: './plm/plm.module#PlmModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ]
            },{
                path: 'userService',
                loadChildren: './UserService/user-service.module#UserServiceModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],
            }, {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'login',
                component: GammaLoginComponent
            }
            , {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            }, {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            }, {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            }, {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }, {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            }, {
                path: 'userService',
                loadChildren: './UserService/user-service.module#UserServiceModule'
            },{
                path: 'approval',
                loadChildren: './approval/approval.module#ApprovalModule'
            },{
                path: 'releaseService',
                loadChildren: './ReleaseManagementService/release-management-service.module#ReleaseManagementServiceModule', canActivate: [
                    AuthGuardService, RoleGaurdService
                ],

            }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }
];
