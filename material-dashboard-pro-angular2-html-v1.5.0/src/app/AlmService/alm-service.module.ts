import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import { Gam4Component} from '../AlmService/components/gam4/gam4.component';
import {Gam28Component} from '../AlmService/components/gam28/gam28.component';
import {Gam1Component} from '../AlmService/components/gam1/gam1.component';
import {Gam6Component} from '../AlmService/components/gam6/gam6.component';
import {Gam7Component} from '../AlmService/components/gam7/gam7.component';
import {Gam27Component} from '../AlmService/components/gam27/gam27.component';
import {Gam30Component} from '../AlmService/components/gam30/gam30.component';
import {Gam29Component} from '../AlmService/components/gam29/gam29.component';
import { Gam6Service } from '../AlmService/services/gam6/gam6.service';
import { Gam29Service } from '../AlmService/services/gam29/gam29.service';
import { Gam27Service } from '../AlmService/services/gam27/gam27.service';
import { Gam7Service } from '../AlmService/services/gam7/gam7.service';
import { Gam1Service } from '../AlmService/services/gam1/gam1.service';
import { Gam30Service } from '../AlmService/services/gam30/gam30.service';
import {Gam4Service} from '../AlmService/services/gam4/gam4.service';
import {Gam28Service} from '../AlmService/services/gam28/gam28.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {AlmServiceRoutes} from './alm-service.routing';
import { ReleaseComponent } from './components/release/release.component';
import {ReleaseService} from './services/release/release.service';
import { Gam92Component } from './components/gam92/gam92.component';
import { Gam92Service } from './services/gam92/gam92.service';
import { Gam91Component } from './components/gam91/gam91.component';
import { Gam91Service } from './services/gam91/gam91.service';
import { MaterialModule } from '../app.module';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {MatInputModule} from '@angular/material';
import { Gam86Component } from './components/gam86/gam86.component';
import {Gam86Service} from './services/gam86/gam86.service';
import {Gam85Component} from './components/gam85/gam85.component';
import {Gam85Service} from './services/gam85/gam85.service';
import { CRsRelatedReleasesComponent } from './components/CRsRelatedReleases/CRsRelatedReleases.component';
import { DefectTabsComponent } from './components/defect-tabs/defect-tabs.component';
import {TokenInterceptorService} from '../services/token-interceptor/token-interceptor.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AlmServiceRoutes),
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
  declarations: [
      Gam4Component,
      Gam28Component,
      Gam1Component,
      Gam6Component,
      Gam7Component,
      Gam27Component,
      Gam30Component,
      Gam29Component,
      ReleaseComponent,
      Gam92Component,
      Gam91Component,
      Gam86Component,
      Gam85Component,
      CRsRelatedReleasesComponent,
      DefectTabsComponent
  ],
    providers: [
        Gam6Service,
        Gam29Service,
        Gam27Service,
		Gam7Service,
        Gam1Service,
        Gam30Service,
        Gam4Service,
        Gam28Service,
        ReleaseService,
        Gam92Service,
        Gam91Service,
        Gam86Service,
        Gam85Service,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
})

export class AlmServiceModule {}
