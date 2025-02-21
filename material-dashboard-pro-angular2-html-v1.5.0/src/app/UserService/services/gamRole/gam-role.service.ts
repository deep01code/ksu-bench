import { Injectable } from '@angular/core';
import {Role} from '../../classes/gamRole/role';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {RoleWithUsers} from '../../classes/gamRole/roleWithUsers';
import {Role_accounts} from '../../classes/gamRole/Role_accounts';
import {environment} from '../../../../environments/environment';
@Injectable()
export class GamRoleService {
    public SERVER_URL: string = environment.serverUrl;
    private GetRolesUrl = this.SERVER_URL+'/RoleManagement/allRoles';
    private GetSelectedRoleId1 = this.SERVER_URL+'/RoleManagement/RoleId?roleId=';
    private PostRole = this.SERVER_URL+'/RoleManagement/AddRole';
    private PostUpadteUsersToRole = this.SERVER_URL+'/RoleManagement/updateUsersToRole';

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]>{
        return this.http.get<Role[]>(this.GetRolesUrl);
    }

    getRolesWithUsers(): Observable<RoleWithUsers[]>{
        return this.http.get<RoleWithUsers[]>(this.GetRolesUrl);
    }

    getSelecedRoleByIdwithUser(id): Observable<RoleWithUsers>{
        return this.http.get<RoleWithUsers>(this.GetSelectedRoleId1 + id);
    }

    postRole(entry: Role): Observable<Role> {
        return this.http.post<Role>(this.PostRole , entry);
    }

    postUpadteUsersToRole(entry: Role_accounts): Observable<Role_accounts>{
        return this.http.post<Role_accounts>(this.PostUpadteUsersToRole, entry);
    }

}
