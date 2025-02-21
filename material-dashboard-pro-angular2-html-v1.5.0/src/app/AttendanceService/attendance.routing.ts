import { Routes } from '@angular/router';
import { Gam50Component } from './components/gam50/gam50.component';
import { Gam52Component } from './components/gam52/gam52.component';
import {Gam51Component} from './components/gam51/gam51.component';
import { Gam64Component } from './components/gam64/gam64.component';
import {Gam238Component} from './components/gam238/gam238.component';
import {Gam704Component} from './gam704/gam704.component';
import {Gam788Component} from './components/gam788/gam788.component';
import {ProjectFormComponent} from './gam883/project-form/project-form.component';
import {BillingRoleFormComponent} from './gam883/billing-role-form/billing-role-form.component';
import {BudgetFormComponent} from './gam883/budget-form/budget-form.component';
import {ResponsibleFormComponent} from './gam883/responsible-form/responsible-form.component';
import {Gam883Component} from './gam883/gam883.component';
import {ProgramFormComponent} from './program/program-form/program-form.component';
import {DepartmentFormComponent} from './program/department-form/department-form.component';
export const AttendanceRoutes: Routes = [
    {
        path: '',
        children: [
        {
            path: 'gam50',
            component: Gam50Component
        },{
            path: 'gam51',
            component: Gam51Component
        },{
                path: 'gam52',
                component: Gam52Component
        },{
                path: 'gam64',
                component: Gam64Component                
        },{
                path: 'gam238',
                component: Gam238Component
        },{
                path:'gam704',
                component: Gam704Component
        },{
                path:'gam788',
                component: Gam788Component
        },{
                path:'projectForm',
                component: ProjectFormComponent
        },{
                path:'billingRoleForm',
                component:BillingRoleFormComponent
        },{
                path:'budgetForm',
                component:BudgetFormComponent
        },{
                path:'responsibleForm',
                component:ResponsibleFormComponent
        },{
                path:'gam883',
                component:Gam883Component
        }, {
                path:'programForm',
                component:ProgramFormComponent
        }, {
                path:'programs/:id',
                component:DepartmentFormComponent
        }

    ]}
];