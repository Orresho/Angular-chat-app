import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthLogService {

    domain = 'http://localhost:3000'

    constructor(
        private http: Http
    ) { }


    // Register a new user
    saveUser(user) {
        //Http post req to server service
        return this.http.post(`${this.domain}/users/register`, user)
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err));
    }

    // Login a user
    authenticateUser(user) {
        //Http post req to server to authenticate user
        return this.http.post(`${this.domain}/users/login`, user)
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err));
    }

    // When user is logged in
    isLoggedIn() {

    }

}