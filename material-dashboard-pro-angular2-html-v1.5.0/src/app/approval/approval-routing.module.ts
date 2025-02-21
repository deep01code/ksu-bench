import { Routes, RouterModule } from '@angular/router';

import {Gam709Component} from './components/gam709/gam709.component';


export const ApprovalRoutingModule: Routes = [
    {
        path: '',
        children: [
            {path: 'gam709',component: Gam709Component },

        ]
    },
];





