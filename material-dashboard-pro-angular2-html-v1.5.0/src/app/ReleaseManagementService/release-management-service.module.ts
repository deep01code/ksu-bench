import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ReleaseManagementServiceRoutes} from './release-management-service.routing';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../app.module';
import {MatInputModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import {ReleaseFormComponent} from './release-form/release-form.component';
import {TokenInterceptorService} from '../services/token-interceptor/token-interceptor.service';
import {ReleaseManagementService} from './release-management.service';
import { FetchCrDetailsComponent } from './fetchCrDetails/component/fetch-cr-details.component';

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(ReleaseManagementServiceRoutes),
      FormsModule,
      HttpClientModule,
      MaterialModule,
      MatInputModule,
      HttpModule,
      ReactiveFormsModule
  ],
  declarations: [
      ReleaseFormComponent,
      FetchCrDetailsComponent
  ],
  providers:[
      ReleaseManagementService,

  ]
})
export class ReleaseManagementServiceModule { }
