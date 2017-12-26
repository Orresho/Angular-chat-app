import { Injectable } from '@angular/core';

@Injectable()
export class RegisterValidationService {

    validateEmail(controls) {
        // Create regular expression
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateEmail': true };
        }
    }

}