import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {UserServiceRoutes} from './user-service.routing'
import {AppModule, MaterialModule} from '../app.module';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {MatInputModule} from '@angular/material';
import {GamUserComponent} from './components/gamUser/gam-user.component';
import {GamUserService} from './services/gamUser/gamUser.service';
import { GamRoleComponent } from './components/gamRole/gam-role.component';
import {GamRoleService} from './services/gamRole/gam-role.service';
import { GamUserMangeComponent } from './components/gamUserMange/gam-user-mange.component';
import { GamUserdetailsComponent } from './components/gamUserdetails/gam-userdetails.component';
import { GamRoleMangeComponent } from './components/gamRoleMange/gam-role-mange.component';
import { GamRoleDetailsComponent } from './components/gamRoleDetails/gam-role-details.component';
import {FilterPipe} from '../pipes/filter.pipe';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import {TokenInterceptorService} from '../services/token-interceptor/token-interceptor.service';
import {AddValue, LovComponent} from './components/lov/lov.component';
import {LoVService} from "../PST/services/LoV/LoVService";
import {PstModule} from "../PST/pst.module";
import {EditGeneralDepartment} from "../PST/components/gd-management/gd-management.component";
import {AddBenefits} from "../PST/components/edit-employee/upsert-employee.component";
import {ContractDetails} from "../PST/components/project-management/project-details/project-details.component";
import {SubContractDetails} from "../PST/components/project-management/sub-contract/sub-contract.component";
import { StructureComponent } from './components/structure/structure.component';
import {StructureService} from "./services/structureServices/structure.service";
import { AddSectorComponent } from './components/structure/entry-components/add-sector/add-sector.component';
import { AddFinancialNumberComponent } from './components/structure/entry-components/add-financial-number/add-financial-number.component';
import { AddPoComponent } from './components/structure/entry-components/add-po/add-po.component';
import { ListFinComponent } from './components/list-fin/list-fin.component';
import { ListPoComponent } from './components/list-po/list-po.component';
import { ListPartialPoComponent } from './components/list-partial-po/list-partial-po.component';
import { UpsertFinComponent } from './components/upsert-fin/upsert-fin.component';
import { UpsertPoComponent } from './components/upsert-po/upsert-po.component';
import { UpsertPartialPoComponent } from './components/upsert-partial-po/upsert-partial-po.component';
import { ListAgreementComponent } from './components/list-agreement/list-agreement.component';
import { UpsertAgreementComponent } from './components/upsert-agreement/upsert-agreement.component';
import { AddPartialPoComponent } from './components/structure/entry-components/add-partial-po/add-partial-po.component';
import { VendorV2Component } from './components/vendor-v2/vendor-v2.component';
import { AddAgreementComponent } from './components/structure/entry-components/add-agreement/add-agreement.component';
import {
    AddAgreementItemComponent,
    MyFilterPipe
} from './components/structure/entry-components/add-agreement-item/add-agreement-item.component';
import { AddDomainComponent } from './components/structure/entry-components/add-domain/add-domain.component';
import { ListDomainsComponent } from './components/list-domains/list-domains.component';
import { UpsertDomainComponent } from './components/upsert-domain/upsert-domain.component';
import { AddSystemComponent } from './components/structure/entry-components/add-system/add-system.component';
import { AddJobNameComponent } from './components/structure/entry-components/add-job-name/add-job-name.component';
import { AddJobLevelComponent } from './components/structure/entry-components/add-job-level/add-job-level.component';
import { AddEmployeeComponent } from './components/structure/entry-components/add-employee/add-employee.component';
import { AddContactComponent } from './components/structure/entry-components/add-contact/add-contact.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserServiceRoutes),
        FormsModule,
        ChartsModule,
        HttpClientModule,
        MaterialModule,
        MatInputModule,
        HttpModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        PstModule,

    ],
    declarations: [
        GamUserComponent,
        GamRoleComponent,
        GamUserMangeComponent,
        GamUserdetailsComponent,
        GamRoleMangeComponent,
        GamRoleDetailsComponent,
        FilterPipe,
        ChangepasswordComponent,
        LovComponent,
        AddValue,
        StructureComponent,
        AddSectorComponent,
        AddFinancialNumberComponent,
        AddPoComponent,
        ListFinComponent,
        ListPoComponent,
        ListPartialPoComponent,
        UpsertFinComponent,
        UpsertPoComponent,
        UpsertPartialPoComponent,
        ListAgreementComponent,
        UpsertAgreementComponent,
        AddPartialPoComponent,
        VendorV2Component,
        AddAgreementItemComponent,
        AddDomainComponent,
        ListDomainsComponent,
        UpsertDomainComponent,
        AddSystemComponent,
        AddJobNameComponent,
        AddJobLevelComponent,
        AddEmployeeComponent,
        ReportsComponent,
        ListErrorsComponent,
        //AddContactComponent,
       // MyFilterPipe

    ],
    providers: [
        GamUserService,
        StructureService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        GamRoleService,
        LoVService
    ],
    exports: [
      //  MyFilterPipe
    ],
    entryComponents: [AddValue,
        AddSectorComponent,
        AddFinancialNumberComponent,
        AddPoComponent,
        AddPartialPoComponent,
        AddAgreementItemComponent,
        AddDomainComponent,
        AddSystemComponent,
        AddJobNameComponent,
        AddJobLevelComponent,
        AddEmployeeComponent,
    ]

})

export class UserServiceModule {}
