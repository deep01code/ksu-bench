import { SubContractComponent } from './components/project-management/sub-contract/sub-contract.component';
import { ProjectViewComponent } from './components/project-management/project-view/project-view.component';
import { SystemDomainDetailsComponent } from './components/system-domain/system-domain-details/system-domain-details.component';
import { ProjectDetailsComponent } from './components/project-management/project-details/project-details.component';
import { SystemDomainComponent } from './components/system-domain/system-domain/system-domain.component';
import { VendorDetailsComponent } from './components/vendor-management/VendorDetails/VendorDetails.component';
import { VendorMainViewComponent } from './components/vendor-management/VendorMainView/VendorMainView.component';
import { EmployeeDetailsComponent } from './components/employee/EmployeeDetails/EmployeeDetails.component';
import { Component } from '@angular/core';
import { GdManagementComponent } from './components/gd-management/gd-management.component';
import { CreateEmployeeComponent } from './components/employee/CreateEmployee/CreateEmployee.component';
import { Routes } from '@angular/router';
import {ViewEmployeesComponent} from "./components/employee/view-employees/view-employees.component";
import {ReportManagmentComponent} from "./components/report-managment/report-managment.component";
import {UpsertEmployeeComponent} from "./components/edit-employee/upsert-employee.component";
import {SiteUpdateComponent} from "./components/site-update/site-update.component";


export const PstRoutes: Routes = [
    {
        path: '',
        component: ViewEmployeesComponent
    }, {
        path: '',
        children: [ 
            {
            path: 'generaldepartments',
            component: GdManagementComponent
            },{
                path: "vendors",
                component: VendorMainViewComponent
            },{
                path: "vendor/:id",
                component: VendorDetailsComponent
            },{
                path: "system-domains",
                component: SystemDomainComponent
            },{
                path: "system-domain/:id",
                component: SystemDomainDetailsComponent
            },
            {
                path: "projects",
                component: ProjectViewComponent
            },
            {
                path: "project/:id",
                component: ProjectDetailsComponent
            },
            {
                path: "project/:id/subcontract",
                component: SubContractComponent
            },
            {
                path: "employee",
                component: ViewEmployeesComponent
            },
            {
                path: "employee/:id",
               // component:EmployeeDetailsComponent,
                component:UpsertEmployeeComponent,
            },
            {
                path: "edit-employee/:id",
                component:UpsertEmployeeComponent,

            },
            {
                path:"report",
                component:ReportManagmentComponent,
            },
            {
                path:"site-update",
                component:SiteUpdateComponent,
            }



        ]
    },
];
