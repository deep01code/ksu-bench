import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {GammaLoginService} from '../services/gamma-login/gamma-login.service';
import {SidebarService} from '../sidebar/sidebar.service';
import {SidebarModule} from '../sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,SidebarModule
  ],
  declarations: [],

  providers:[GammaLoginService,SidebarService]
})
export class GammaLoginModule { }
