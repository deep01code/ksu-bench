import { Routes } from '@angular/router';

import {Gam4Component} from '../AlmService/components/gam4/gam4.component';
import {Gam28Component} from '../AlmService/components/gam28/gam28.component';
import {Gam1Component} from '../AlmService/components/gam1/gam1.component';
import {Gam6Component} from '../AlmService/components/gam6/gam6.component';
import {Gam7Component} from '../AlmService/components/gam7/gam7.component';
import {Gam27Component} from '../AlmService/components/gam27/gam27.component';
import {Gam29Component} from '../AlmService/components/gam29/gam29.component';
import {Gam30Component} from '../AlmService/components/gam30/gam30.component';
import {Gam92Component} from './components/gam92/gam92.component';
import {Gam91Component} from './components/gam91/gam91.component';
import {Gam86Component} from './components/gam86/gam86.component';
import {Gam85Component} from './components/gam85/gam85.component';
import { CRsRelatedReleasesComponent } from './components/CRsRelatedReleases/CRsRelatedReleases.component';
import { DefectTabsComponent } from './components/defect-tabs/defect-tabs.component';


export const AlmServiceRoutes: Routes = [
    {
        path: '',
        component: Gam4Component
    }, {
        path: '',
        children: [ {
            path: 'gam1',
            component: Gam1Component
        }, {
            path: 'gam4',
            component: Gam4Component
        }, {
            path: 'gam6',
            component: Gam6Component
        }, {
            path: 'gam7',
            component: Gam7Component
        }, {
            path: 'gam27',
            component: Gam27Component
        }, {
            path: 'gam28',
            component: Gam28Component
        }, {
            path: 'gam29',
            component: Gam29Component
        }, {
            path: 'gam30',
            component: Gam30Component
        }, {
            path: 'gam92',
            component: Gam92Component
        },  {
            path: 'gam91',
            component: Gam91Component
        },  {
            path: 'gam92',
            component: Gam92Component
        },  {
            path: 'gam86',
            component: Gam86Component
        },  {
            path: 'gam85',
            component: Gam85Component
        },  {
            path: 'CRsStatus',
            component: CRsRelatedReleasesComponent
        },  {    
            path: 'Defects',
            component: DefectTabsComponent
        }]
    },
];
