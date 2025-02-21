import { NgModule } from '@angular/core';
import {LoadingComponent} from './loading/loading.component';
import {MultiselectComponent} from './multiselect/multiselect.component';

@NgModule({
    imports: [  ],
    exports: [
        LoadingComponent,
        MultiselectComponent
    ],
    declarations: [
        LoadingComponent,
        MultiselectComponent
    ],
    providers: [ ],
})

export class CommonComponentsModule {}
