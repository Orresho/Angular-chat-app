import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }


  ngOnInit() {
  }

  onRegisterSubmit() {

    this.disableForm();
    const user = {
      username: this.myForm.get('username').value,
      email: this.myForm.get('email').value,
      password: this.myForm.get('password').value
    };

    // Call service
    this.authService.saveUser(user)
      .subscribe(data => {
        console.log(data);
      });
    // console.log(user);
    this.myForm.reset();
  }


  // Create the form with all it's validations
  createForm() {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        // Validators.pattern('/^[a-zA-Z0-9]+$/')
      ])],

      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
        // Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])],

      // Confirm password
      confirmPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])]
    },
      { validator: this.matchingPasswords()});
  }

  // Validation to check that the two password fields match
  matchingPasswords() {
    return (group: FormGroup) => {
      if (group.controls['password'].value === group.controls['confirmPassword'].value) {
        return null // return as a match
      } else {
        return { 'matchingPasswords': true } // return as error: do not match
      }
    }
  }


  // Disable form => Used when user submits the form succesfully
  disableForm(){
    this.myForm.controls['username'].disable();
    this.myForm.controls['email'].disable();
    this.myForm.controls['password'].disable();
    this.myForm.controls['confirmPassword'].disable();
  }

  // Enable form => Used when submitting the form fails, enabling the user to do it again.
  enableForm(){
    this.myForm.controls['username'].enable();
    this.myForm.controls['email'].enable();
    this.myForm.controls['password'].enable();
    this.myForm.controls['confirmPassword'].enable();
  }
}
