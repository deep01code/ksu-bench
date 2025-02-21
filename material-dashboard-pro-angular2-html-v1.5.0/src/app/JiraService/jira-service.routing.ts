import { Routes } from '@angular/router';

import {Gam133Component} from './gam133/components/gam133.component';
import {Gam394Component} from './gam394/component/gam394.component';
import {Gam453Component} from './gam453/component/gam453.component';

export const JiraServiceRoutes: Routes = [
     {
        path: '',
        children: [ 
            {path: 'gam133',component: Gam133Component },
            {path: 'gam394',component: Gam394Component },
            {path: 'crs',component: Gam453Component },
            {path: 'gam133',component: Gam133Component},
        ]
    },
];
