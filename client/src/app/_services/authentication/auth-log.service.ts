import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthLogService {

    domain = 'http://localhost:3000'
    authToken;
    user;

    constructor(
        private http: Http
    ) { }

    saveUser(user) {
        //Http post req to server service
        return this.http.post(`${this.domain}/users/register`, user)
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err));
    }

    // On login
    authenticateUser(user) {
        //Http post req to server to authenticate user
        return this.http.post(`${this.domain}/users/login`, user)
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err));
    }
    // Store user data when user logs in
    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);

        // Assign values to variables to be used elsewhere
        this.authToken = token;
        this.user = user;
    }

    // When user is logged in
    isLoggedIn() {

    }

}