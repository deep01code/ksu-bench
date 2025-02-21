export class UserIfno {
    /*"getDetails": {
        "{}": "",
        "grant_type": "password",
        "scope": "webclient",
        "username": "admin"
    },
    "user": {
        "password": null,
        "username": "admin",
        "authorities": [
            {
                "authority": "PRIVILEGE_ADMIN"
            },
            {
                "authority": "ROLE_ADMIN"
            }
            ],
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "enabled": true
    },
    */
     getDetails:{
        username:string,
     };
     authorities:string[];
}
