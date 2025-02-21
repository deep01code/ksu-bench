import {Component, HostListener, OnInit} from '@angular/core';
import {GammaLoginService} from './services/gamma-login/gamma-login.service';

declare var $: any;

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html',

})

export class AppComponent implements OnInit {
    @HostListener('window:onbeforeunload', ['$event'])
    unloadHandler(event) {
        localStorage.clear();
    }

    constructor(public auth:GammaLoginService) {}


    ngOnInit() {
        $.material.init();
        this.auth.generateMenuItems()
      //  this.doit();
    }

    /*doit(){
    console.log(        this.auth.getRoles()
    )
    }*/

}
