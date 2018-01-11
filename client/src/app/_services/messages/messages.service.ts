import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MessagesService {

    constructor(
        private http: Http
    ) { }

    messages = [];


    domain = 'http://localhost:3000'
    // authToken: string;
    // user: string;
    // options: RequestOptions;

    //********** */
    // Used when we need to authorize the user for a certain request.
    // For example accessing his/her profile page
    //********** */
    // createAuthenticationHeaders() {
    //     this.loadToken();

    //     // Pass request options with the authToken key/value to a global property
    //     this.options = new RequestOptions({
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'authorization': this.authToken
    //         })
    //     })
    // }

    // // Get the token
    // loadToken() {
    //     this.authToken = localStorage.getItem('token');
    // }


    // Get messages
    getMessages() { }


    // Post messages
    saveMessages(data) {

        // request to domain with auth headers
        return this.http.post(`${this.domain}/messages/newMessage`, data)
            .map((response: Response) => {
                const res = response.json();
                console.log(res);
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }



}