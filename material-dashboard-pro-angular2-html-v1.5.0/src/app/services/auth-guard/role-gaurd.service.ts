import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {GammaLoginService} from '../gamma-login/gamma-login.service';

@Injectable()
export class RoleGaurdService implements CanActivate{

    constructor(private router:Router, private gammaLogin:GammaLoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const princeToken = localStorage.getItem('access_token');

        if (princeToken) {

          /*  if(this.gammaLogin.hasAnyRole(["ROLE_ALM"])){this.router.navigate(['/almService'])}
            if(this.gammaLogin.hasAnyRole(["ROLE_JIRA"])){this.router.navigate(['/jiraService'])}
            if(this.gammaLogin.hasAnyRole(["ROLE_ATTENDANCE"])){this.router.navigate(['/attendanceService'])}
            if(this.gammaLogin.hasAnyRole(["ROLE_CONCEPT"])){this.router.navigate(['/SCA'])}
*/
            return true;
        }


        return false;

    }
}
