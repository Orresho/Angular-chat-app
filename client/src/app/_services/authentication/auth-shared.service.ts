import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthShared {

    domain = 'http://localhost:3000'
    authToken: string;
    user: string;
    options: RequestOptions;

    constructor(
        private http: Http
    ) { }

    //********** */
    // Used when we need to authorize the user for a certain request.
    // For example accessing his/her profile page
    //********** */
    createAuthenticationHeaders() {
        this.loadToken();

        // Pass request options with the authToken key/value to a global property
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authToken
            })
        })
    }

    // Get the token
    loadToken() {
        this.authToken = localStorage.getItem('token');
    }


    // Store user data when user logs in
    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Assign values to variables to be used elsewhere
        this.authToken = token;
        this.user = user;
    }

    // Get the profile data from authenticated and authorized user
    getProfile() {
        // Calling this method will give us access to the headers in the global "option" property
        this.createAuthenticationHeaders();
        return this.http.get(`${this.domain}/user/profile`, this.options)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error));

    }

    updateUserProfile(){
        this.createAuthenticationHeaders();
        return this.http.put(`${this.domain}/user/editProfile`, this.options)
            .map((response:Response) => {
                response.json()
                console.log(this.options);
            })
            .catch((error:Response) => Observable.throw(error.json()));
    }


    //******** */
    //
    // Logout
    //
    //******* */
    logout(){

        // Clear headers and localStorage
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

}