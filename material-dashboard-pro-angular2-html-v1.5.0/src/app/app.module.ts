import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'ngx-easy-table';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatTableDataSource,
} from '@angular/material';

import { AppComponent } from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedpluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { AppRoutes } from './app.routing';
import {DataTableConfigService} from './common-services/data-table-config/data-table-config.service';
import {CommonComponentsModule} from './common-components/common-components.module';
import {FilterPipe} from './pipes/filter.pipe';
import { GammaLoginComponent } from './gamma-login/gamma-login.component';
import {GammaLoginService} from './services/gamma-login/gamma-login.service';
import {AuthSdkService} from './services/auth-sdk/auth-sdk.service';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';
import {SidebarService} from './sidebar/sidebar.service';
import {RoleGaurdService} from './services/auth-guard/role-gaurd.service';
import {AlertService} from './services/alert/alert.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {MyFilterPipe} from "./UserService/components/structure/entry-components/add-agreement-item/add-agreement-item.component";

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    TableModule,
    CommonComponentsModule,
    MyFilterPipe,
  ],

  providers:[DataTableConfigService,GammaLoginService,AuthSdkService,AuthGuardService],
  declarations: [MyFilterPipe ]
})
export class MaterialModule {}

@NgModule({
    imports:      [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        MaterialModule,
        MatNativeDateModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedpluginModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        GammaLoginComponent,
        //MyFilterPipe

    ],
    providers:[AuthGuardService,GammaLoginService,SidebarService,RoleGaurdService,AlertService],
    exports: [
       // MyFilterPipe
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
