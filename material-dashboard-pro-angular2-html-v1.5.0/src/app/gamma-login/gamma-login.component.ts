import { Component, OnInit } from '@angular/core';
import {GammaLoginService} from '../services/gamma-login/gamma-login.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gamma-login',
  templateUrl: './gamma-login.component.html',
  styleUrls: ['./gamma-login.component.scss']
})
export class GammaLoginComponent implements OnInit {

  //  userCredentials: { username: string, password: string } = {username: '', password:''};

    username:string='';
    password:string='';
    constructor(private loginService:GammaLoginService,private router:Router) { }

    ngOnInit() {

    }

    login() {
        if(this.username!=''&&this.password!=''){
            this.loginService.login(this.username,this.password)
            setTimeout(()=>{
                this.loginService.generateMenuItems()

            },500)

        }
        else{
            swal( "Missing Credentials" ,  "Please enter username and password" ,  "error" )

        }
       /* setTimeout(function () {
            location.reload()
        },1000)*/


    }

}
