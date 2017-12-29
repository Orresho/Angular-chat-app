import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService{

    domain = 'http://localhost:3000'

    constructor(
        private http: Http
    ){}

    saveUser(user){
        //Http post req to server service
        return this.http.post(`${this.domain}/users/register`, user)
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err));
    }

    authenticateUser(){
        //Http post req to server to authenticate user
    }

    // When user is logged in
    isLoggedIn(){

    }

}