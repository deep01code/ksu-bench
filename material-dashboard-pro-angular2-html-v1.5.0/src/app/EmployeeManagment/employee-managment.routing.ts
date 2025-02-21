import { Routes } from '@angular/router';
import {EmployeeHistoryComponent} from './employee-history/component/employee-history.component';
import {EmployeeComponent} from './employee/component/employee.component';
import {ExceptionsComponent} from './Exceptions/component/exceptions.component';
import {ViewExceptionsComponent} from './view-exceptions/component/view-exceptions.component';


export const EmployeeManagementRoutes: Routes = [
     {
         path: '',
         component: EmployeeComponent
    },{
         path: 'employees_management',
         component: EmployeeComponent
    },
    {
        path: ':id/history',
        component: EmployeeHistoryComponent
    },
    {
        path: 'exceptions',
        component: ExceptionsComponent
    },
    {
        path: 'view-exceptions',
        component: ViewExceptionsComponent
    }
];
