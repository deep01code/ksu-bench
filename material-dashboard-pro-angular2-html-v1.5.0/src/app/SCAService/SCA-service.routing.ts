import { Routes } from '@angular/router';
import {Gam202Component} from './gam202/component/gam202.component';
import {Gam205Component} from './gam205/component/gam205.component';
import {Gam220Component} from './gam220/component/gam220.component';
import { Gam259Component } from './gam259/component/gam259.component';
import {WizardComponent} from './wizard/component/wizard.component';
import {Gam258Component} from './gam258/component/gam258.component';
import {Gam304Component} from './gam304/component/gam304.component';
import  {GamvouchersComponent} from './gamVouchers/component/gamvouchers.component';
import {Gam266Component} from './gam266/component/gam266.component';
import {PostpaidPackagesComponent } from './postpaid-packages/component/postpaid-packages.component';
import {GamPrepaidVouchersComponent} from './gamPrepaidVouchers/component/gam-prepaid-vouchers.component';
import {Gam267Component} from "./gam267/component/gam267.component";
import {Gam338Gam339Component} from './gam338-gam339/component/gam338-gam339/gam338-gam339.component';
import {Gam340Component} from './gam340/component/gam340/gam340.component';

export const SCAServiceRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'gam205',
            component: Gam205Component

        } ,{
            path: 'gam220',
            component: Gam220Component
        }, {
            path: 'gam258',
            component: Gam258Component
        },{
            path: 'wizard',
            component: WizardComponent,
            children: [
                {
                    path: 'gam202',
                    component: Gam202Component
                }, {
                    path: 'gam259',
                    component: Gam259Component
                },{
                    path: 'gam266',
                    component: Gam266Component
                }, {
                    path: 'gam258',
                    component: Gam258Component
                },{
                    path: 'gamvouchers',
                    component: GamvouchersComponent
                },{
                    path: 'gamPrepaidVouchers',
                    component: GamPrepaidVouchersComponent
                },
                {
                    path: 'postpaid',
                    component: PostpaidPackagesComponent
                },{
                    path: 'gam267',
                    component: Gam267Component
                },{
                    path: 'gam267',
                    component: Gam267Component
                },{
                    path: 'gam304',
                    component: Gam304Component
                },{
                    path: 'gam338',
                    component: Gam338Gam339Component
                }, {
                    path: 'gam340',
                    component: Gam340Component
                }
            ]
        }]
    },
];
