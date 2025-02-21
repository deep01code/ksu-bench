import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpParameterCodec} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../app.module';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {MatInputModule} from '@angular/material';
import {SCAServiceRoutes} from './SCA-service.routing';
import { Gam266Component } from './gam266/component/gam266.component';
import {Gam202Component} from './gam202/component/gam202.component';
import {Gam205Component} from './gam205/component/gam205.component';
import {WizardComponent} from './wizard/component/wizard.component';
import {Gam220Component} from './gam220/component/gam220.component';
import { Gam258Component } from './gam258/component/gam258.component';
import { Gam259Component } from './gam259/component/gam259.component';
import { GamvouchersComponent } from './gamVouchers/component/gamvouchers.component';
import { GamPrepaidVouchersComponent } from './gamPrepaidVouchers/component/gam-prepaid-vouchers.component'
import {Gam205Service} from './gam205/gam205.service';
import {Gam220Service} from './gam220/gam220.service';
import {Gam202Service} from './gam202/gam202.service';
import {WizardService} from './wizard/wizard.service';
import {Gam258Service} from './gam258/gam258.service';

import {AuthGuardService} from '../services/auth-guard/auth-guard.service';
import {TokenInterceptorService} from '../services/token-interceptor/token-interceptor.service';


import { Gam304Component } from './gam304/component/gam304.component';
import {GetDataTableService} from './sharedServices/get-data-table.service';


import { PostpaidPackagesComponent } from './postpaid-packages/component/postpaid-packages.component';
import {PostpaidPackagesService} from './postpaid-packages/postpaid-packages.service';
import {GamvouchersService} from './gamVouchers/gamvouchers.service';
import {PrepaidVoucherService} from './gamPrepaidVouchers/prepaid-voucher.service';
import { Gam267Component } from './gam267/component/gam267.component';
import {FilterPipe} from '../pipes/filter.pipe';
import { Gam338Gam339Component } from './gam338-gam339/component/gam338-gam339/gam338-gam339.component';
import {Gam338Gam339Service} from './gam338-gam339/gam338-gam339.service';
import { Gam340Component } from './gam340/component/gam340/gam340.component';
import {Gam340Service} from './gam340/gam340.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SCAServiceRoutes),
        FormsModule,
        ChartsModule,
        HttpClientModule,
        MaterialModule,
        MatInputModule,
        HttpModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
    ],
    declarations: [
        Gam202Component,
        Gam205Component,
        WizardComponent,
        Gam220Component,
        Gam259Component,
        Gam258Component,
        Gam304Component,
        Gam266Component,
        Gam258Component,
        PostpaidPackagesComponent,
        Gam258Component,
        GamvouchersComponent,
        Gam266Component,
        GamPrepaidVouchersComponent,
        Gam267Component,
        Gam338Gam339Component,
        Gam340Component
    ],
    providers: [
        Gam202Service,
        Gam205Service,
        Gam220Service,
        WizardService,
        Gam258Service,
        GamvouchersService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        GetDataTableService,
        PostpaidPackagesService,
        PrepaidVoucherService,
        Gam338Gam339Service,
        Gam340Service
    ],
})

export class SCAServiceModule {}
