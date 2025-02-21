import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {Gam133Component} from './gam133/components/gam133.component';
import { Gam133Service } from './gam133/gam133.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {JiraServiceRoutes} from './jira-service.routing'; 
import { MaterialModule } from '../app.module';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {MatInputModule} from '@angular/material';
import { Gam394Component } from './gam394/component/gam394.component';
import { Gam453Component } from './gam453/component/gam453.component';
import {ServiceService} from './gam453/service.service';
import {JiraSharedService} from './sharedService/jira-shared.service';
import {TokenInterceptorService} from '../services/token-interceptor/token-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JiraServiceRoutes),
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
      Gam133Component,
      Gam394Component,
      Gam453Component
  ],
    providers: [
        Gam133Service,
        ServiceService,
        JiraSharedService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
})

export class JiraServiceModule {}
