import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gam881Component } from './components/gam881/gam881.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../app.module';
import {MatInputModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {AutomationRoutes} from './automation.routing';
import {TokenInterceptorService} from '../services/token-interceptor/token-interceptor.service';
import {Gam881Service} from './services/gam881/gam881.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AutomationRoutes),
        FormsModule,
        ChartsModule,
        HttpClientModule,
        MaterialModule,
        MatInputModule,
        HttpModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule
    ],
  declarations: [Gam881Component],
    providers: [

        Gam881Service,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ]
})
export class AutomationModule { }
