import { Routes } from '@angular/router';
import {ReleaseFormComponent} from './release-form/release-form.component';
import {FetchCrDetailsComponent} from './fetchCrDetails/component/fetch-cr-details.component';


export const ReleaseManagementServiceRoutes: Routes = [
    {
        path: '',
        children: [
            {path:'release',component:ReleaseFormComponent},
            {path:'cr',component:FetchCrDetailsComponent}
        ]
    }
]