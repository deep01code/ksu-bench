import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {User} from '../../classes/gamUser/user';
import {Role} from '../../classes/gamRole/role';
import {Account_roles} from '../../classes/gamUser/account_roles';
import {UserWithRoles} from '../../classes/gamUser/userWithRoles';
import { Password } from '../../classes/gamUser/password';
import {environment} from '../../../../environments/environment';
import {SearchFinancialDTO, UserRolesDTO} from "../../classes/managerialUnit";


@Injectable()
export class GamUserService {

    usermanagementservice
    public SERVER_URL: string = environment.serverUrl;
    private GetUsersUrl = this.SERVER_URL+'/UserManagement/allUsers';
    private GetUserWithRolesUrl = this.SERVER_URL+'/UserManagement/allUsersWithRoles';
    private GetSelectedUserId = this.SERVER_URL+'/UserManagement/UserId?userId=';
    private PostUser = this.SERVER_URL+'/UserManagement/AddUser';
    private UpdateStatus = this.SERVER_URL+'/UserManagement/ActiveUser?userId=';
    private PostUpadteRolesToUser = this.SERVER_URL+'/UserManagement/updateRolesToUser';
    private ChangePassword = this.SERVER_URL+'/password/changePassword';
    private GetUserByName = this.SERVER_URL+'/password/UserName?username='
    private getUserUnitsUrl = this.SERVER_URL+'/UserManagement/getUserUnits';
    private updateUserUnitsUrl = this.SERVER_URL+'/UserManagement/updateUserUnits';

    constructor(private http: HttpClient) { }

    getUserswithOutRole(): Observable<User[]>{
        return this.http.get<User[]>(this.GetUsersUrl);
    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.GetUserWithRolesUrl);
    }

    getSelecedUserById(id): Observable<User>{
        return this.http.get<User>(this.GetSelectedUserId + id);
    }

    postUser(entry: Account_roles): Observable<Account_roles> {
        return this.http.post<Account_roles>(this.PostUser , entry);
    }

    updateUserStatus(id : number): Observable<number>{
        return this.http.put<number>(this.UpdateStatus , id);
    }

    postUpadteRolesToUser(entry: Account_roles): Observable<Account_roles>{
        return this.http.post<Account_roles>(this.PostUpadteRolesToUser, entry);
    }

    getUserByName(username): Observable<User>{
        return this.http.get<User>(this.GetUserByName + username);
    }

    changePassword(entry: Password): Observable<Password>{
        return this.http.put<Password>(this.ChangePassword, entry);
    }


    getUserUnits(userRolesDTO:UserRolesDTO){ return this.http.post(this.getUserUnitsUrl,userRolesDTO) }

    updateUserUnits(userRolesDTO:UserRolesDTO){ return this.http.post(this.updateUserUnitsUrl,userRolesDTO) }
}
