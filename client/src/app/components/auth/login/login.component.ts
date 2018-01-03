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

  message;
  messageClass;

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthLogService,
    private router: Router
  ) {
    this.createForm();

  }

  ngOnInit() {
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

          // Remove failure alert
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
          this.authService.storeUserData(data.token, data.user);

          // Disable form
          this.disableForm();

          // Display success alert
          this.messageClass = 'alert alert-success';
          this.message = data.message;

          // Navigate to /profile
          setTimeout(() => {
            this.router.navigate(['/profile']);
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
