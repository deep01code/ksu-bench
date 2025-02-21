import { Routes } from '@angular/router';
import {GamUserComponent} from './components/gamUser/gam-user.component'
import {GamRoleComponent} from './components/gamRole/gam-role.component';
import {GamUserMangeComponent} from './components/gamUserMange/gam-user-mange.component';
import { GamUserdetailsComponent } from './components/gamUserdetails/gam-userdetails.component';
import {GamRoleMangeComponent} from './components/gamRoleMange/gam-role-mange.component';
import {GamRoleDetailsComponent} from './components/gamRoleDetails/gam-role-details.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import {LovComponent} from "./components/lov/lov.component";
import {StructureComponent} from "./components/structure/structure.component";
import {ListFinComponent} from "./components/list-fin/list-fin.component";
import {ListPoComponent} from "./components/list-po/list-po.component";
import {ListPartialPoComponent} from "./components/list-partial-po/list-partial-po.component";
import {UpsertFinComponent} from "./components/upsert-fin/upsert-fin.component";
import {UpsertPoComponent} from "./components/upsert-po/upsert-po.component";
import {UpsertPartialPoComponent} from "./components/upsert-partial-po/upsert-partial-po.component";
import {ListAgreementComponent} from "./components/list-agreement/list-agreement.component";
import {UpsertAgreementComponent} from "./components/upsert-agreement/upsert-agreement.component";
import {VendorMainViewComponent} from "../PST/components/vendor-management/VendorMainView/VendorMainView.component";
import {ListDomainsComponent} from "./components/list-domains/list-domains.component";
import {UpsertDomainComponent} from "./components/upsert-domain/upsert-domain.component";
import {ReportsComponent} from "./components/reports/reports.component";
import {ListErrorsComponent} from "./components/list-errors/list-errors.component";


export const UserServiceRoutes: Routes = [
    {
        path: 'gamUser',
        component: GamUserComponent
    },{
        path: 'gamRole',
        component: GamRoleComponent
    },{
        path: 'gamUserMange',
        component: GamUserMangeComponent,
    },{
        path: 'gamUserMange/:username',
        component: GamUserdetailsComponent,
    },{
        path: 'gamRoleMange',
        component: GamRoleMangeComponent,
    },{
        path: 'gamRoleMange/:roleId',
        component: GamRoleDetailsComponent,
    },{
        path: 'changePassword/:username',
        component: ChangepasswordComponent,
    },{
        path: 'lov',
        component: LovComponent,
    },
    {
        path:'structure',
        component: StructureComponent
    },
    {
        path:'listFin',
        component: ListFinComponent
    },
    {
        path:'listPO',
        component: ListPoComponent
    },
    {
        path:'listPartialPO',
        component: ListPartialPoComponent
    },
    {
        path:'listVendor',
        component: VendorMainViewComponent
    },
    {
        path:'listDomain',
        component: ListDomainsComponent
    },
    {
        path:'listAgreement',
        component: ListAgreementComponent
    },
    {
        path:'listError',
        component: ListErrorsComponent
    },
    {
        path:'upsertFin/:id',
        component: UpsertFinComponent
    },
    {
        path:'upsertPO/:id',
        component: UpsertPoComponent
    },
    {
        path:'upsertPartialPO/:id',
        component: UpsertPartialPoComponent
    },
    {
        path:'upsertAgreement/:id',
        component: UpsertAgreementComponent
    },
    {
        path:'upsertDomain/:id',
        component: UpsertDomainComponent
    },
    {
        path:'reports',
        component: ReportsComponent
    },

];
