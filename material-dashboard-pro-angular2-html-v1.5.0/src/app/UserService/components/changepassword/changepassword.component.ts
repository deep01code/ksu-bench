import { Component, OnInit } from '@angular/core';
import {AuthSdkService} from '../../../services/auth-sdk/auth-sdk.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../classes/gamUser/user';
import {GamUserService} from '../../services/gamUser/gamUser.service';
import {Password} from '../../classes/gamUser/password';
import swal from "sweetalert2";

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

    user: User;
    private sub:any;
    password: Password;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    constructor(private authSDK:AuthSdkService,private route: ActivatedRoute,private api: GamUserService) { }

    ngOnInit() {
        //console.log(this.authSDK.getUserName())
        //console.log(this.authSDK.getToken())
        this.checkUserName();
        this.getUserInfo();
        //console.log(this.checkUserName());
    }


    getUserInfo(): void {
        this.route.params.subscribe(params => {
            let username = params['username'];
            this.api.getUserByName(username).subscribe(data =>{
                this.user = data;
            });
        });
    }


    submitForm(): void {

        if(this.currentPassword!=null&&this.newPassword!=null&&this.confirmPassword!=null && this.currentPassword!=''&&this.newPassword!=''&&this.confirmPassword!='' &&
        (this.newPassword==this.confirmPassword)){

            this.password = new Password();
            this.password.id = this.user.username;
            this.password.oldPassword = this.currentPassword;
            this.password.confirm = this.confirmPassword;
            this.password.password = this.newPassword;


            this.api.changePassword(this.password).subscribe(changepassword => {
                swal( "Password Updated" ,  "You have successfully changed your old password" ,"success" )
                setTimeout(()=>{
                    this.authSDK.logout();
                },1000)

                console.log(changepassword);
            },error => {
                swal( "Wrong Information" ,  "You entered wrong values, please try again" ,  "error" )

            })
        }
        else{
            swal( "Wrong or Missing Information" ,  "Please enter all required information" ,  "error" )

        }


    }

    private isAuthenticated: boolean = false;

    checkUserName(): boolean {
        this.route.params.subscribe(params => {
            let username = params['username'];
            if (this.authSDK.getUserName() === username){
                this.isAuthenticated = true
            } else {
                this.isAuthenticated = false;
            }
        });
        return this.isAuthenticated;
    }

}
