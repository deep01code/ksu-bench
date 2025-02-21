import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {GammaLoginService} from '../gamma-login/gamma-login.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router:Router, private gammaLogin:GammaLoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const princeToken = localStorage.getItem('access_token');

        if (princeToken) {
            return true;
        }

        console.log('Sending the login homing pigeon');
        this.gammaLogin.setUrlAfterLogin(state.url);
        this.router.navigate(['/login']);
        return false;

  }

}
