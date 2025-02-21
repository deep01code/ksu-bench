import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AuthBody} from '../../gamma-login/auth-body';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map'

import * as moment from 'moment';
import {Router} from '@angular/router';
import {UserIfno} from '../../gamma-login/user-ifno';
import {observable} from 'rxjs/symbol/observable';

import {environment} from '../../../environments/environment';


@Injectable()
export class AuthSdkService {

    public SERVER_URL: string = environment.serverUrl;
    public AUTH_URL: string = environment.authUrl;
     result:boolean;


  constructor(private http:HttpClient, private router:Router) { }

    authenticate(body): Observable<boolean> {

        if (localStorage.getItem("access_token") !== null ) {
            var diff=moment(moment.locales()).diff(moment(localStorage.getItem("ttl")) , 'hours')
            if(diff<12){
                return Observable.of(true)
            }
            if(diff>12){
                return Observable.of(false)
            }
        }



    return  this.http.post<any>(this.AUTH_URL+'/oauth/token'+'?grant_type=password&scope=webclient&username='+body.username+'&password='+body.password
          ,{},{headers:{"Authorization":"Basic Y2xpZW50OnBhc3N3b3Jk","Content-Type":"application/x-www-form-urlencoded"}})
                .map(res =>{
            if(res.access_token){
                localStorage.setItem('access_token', res)
                localStorage.setItem('access_token', res.access_token)
                localStorage.setItem('ttl', moment().locale())
                this.setRoles()
                return true;
            }
            else if(!res.access_token){
                swal ( "There was a problem" ,  "username or password is wrong!" ,  "error" )
                return false
            }
        })




    }


    logout(){
        //todo implement exit in my auth server
        this.http.get<any>(this.AUTH_URL+'/exit',{headers:{"Authorization":"Bearer "+this.getToken()}})

      this.router.navigate(['/login']);

      localStorage.clear();


    }

    getToken():any{
      return localStorage.getItem("access_token")
    }

    hasRoles(list:string[]):Observable<boolean>{
        var result:boolean=false;
        var userInfo:UserIfno=JSON.parse(localStorage.getItem('userInfo'))

        if(userInfo){
            userInfo.authorities.forEach(function (auth) {

                list.forEach(function (item) {
                    if(auth.toString()===item.toString()){
                        result= true
                    }
                })
            })
        }
      return Observable.of(result);
    }

    getRoles():string[] {
        return JSON.parse(localStorage.getItem('roles'))
    }

    getUserName(): string {
      return localStorage.getItem('username');
    }

    setRoles(){
      //todo implement user in my auth server
        this.http.get<UserIfno>(this.AUTH_URL+'/user', {headers: {"Authorization": "Bearer " + this.getToken()}}).subscribe((data)=>{
         //   console.log(data);
            localStorage.setItem('username',data.getDetails.username)
            localStorage.setItem('roles',JSON.stringify(data.authorities))
        })
    }



    isValid(token){

        //todo investigate
        return this.http.get<UserIfno>(this.AUTH_URL+'/user', {headers: {"Authorization": "Bearer " + token}})

    }



}
