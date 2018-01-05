import { AuthGuard } from './../../../_guards/auth.guard';
import { AuthShared } from './../../../_services/authentication/auth-shared.service';
import { Router } from '@angular/router';
import { AuthLogService } from './../../../_services/authentication/auth-log.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // URL which the user wanted to view/access
  // This property is used as a redirect-URL in the login-method if user is authorized
  previousUrl;

  // The alert properties
  message: string;
  messageClass: string;

  // The login form property
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthLogService,
    private authShared: AuthShared,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm();

  }

  ngOnInit() {
    this.routerSnapShot();
  }


  routerSnapShot() {

    // Check if user has entered a URL they are not yet authorized to view
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to view that page';

      // Remove alert after x miliseconds
      setTimeout(() => {
        this.messageClass = '';
        this.message = '';
      }, 8000);

      // We store the URL the user wanted to access and also set the redirectUrl to undefined to break it's state
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }


  onLoginSubmit() {
    // Disable form
    this.disableForm();

    // Create user object
    const user = {
      username: this.myForm.get('username').value,
      password: this.myForm.get('password').value
    }

    // Subscribe to athenticate service
    this.authService.authenticateUser(user)
      .subscribe(data => {

        console.log(data);
        if (!data.success) {

          // Display failure alert
          this.messageClass = 'alert alert-danger'
          this.message = data.message

          // Remove failure alert after x miliseconds
          setTimeout(() => {
            this.messageClass = '';
            this.message = '';
          }, 8000);

          // Re-enable form after x miliseconds
          setTimeout(() => {
            this.enableForm();
          }, 2000);

        } else {

          // Store token and user to localStorage
          this.authShared.storeUserData(data.token, data.user);

          // Disable form
          this.disableForm();

          // Display success alert
          this.messageClass = 'alert alert-success';
          this.message = data.message;

          // Delay the navigation to URL x miliseconds
          setTimeout(() => {

            // If user tried to access some URL not accessible before authenticated, we direct user to said URL
            if (this.previousUrl) {
              this.router.navigate([this.previousUrl]);
            } else {
              this.router.navigate(['/profile']);
            }

          }, 1500);
        }
      });

    this.myForm.reset();
  }

  // Create the form and call it in the constructor
  createForm() {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])]
    });
  }

  // Disables the form
  disableForm() {
    this.myForm.controls['username'].disable();
    this.myForm.controls['password'].disable();

  }

  // Enables the form
  enableForm() {
    this.myForm.controls['username'].enable();
    this.myForm.controls['password'].enable();
  }

}
