import {Routes} from '@angular/router';
import {Gam881Component} from './components/gam881/gam881.component';




export const AutomationRoutes: Routes = [
    {
        path: '',
        component: Gam881Component
    }, {
        path: '',
        children: [ {
            path: 'gam881',
            component: Gam881Component
        }]
    },
];