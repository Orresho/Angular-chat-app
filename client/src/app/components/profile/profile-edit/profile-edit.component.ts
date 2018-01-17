import { AuthShared } from './../../../_services/authentication/auth-shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  // Message alerts
  message: string;
  messageClass: string;

  // Profile Form
  myForm: FormGroup;

  // Initial props
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  gender: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authShared: AuthShared
  ) { }

  ngOnInit() {
    this.getUserProfile();
    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
      ])],
      email: [''],
      firstname: [''],
      lastname: [''],
      birthdate: [''],
      gender: ['', Validators.required]
    })
  }

  getUserProfile() {
    this.authShared.getProfile()
      .subscribe(result => {
        // Save information to global props
        this.username = result.user.username;
        this.email = result.user.email;


        // If the value is NOT empty only show placeholder
        if (this.birthDate || this.firstname || this.lastname) {
          this.firstname = result.user.firstname;
          this.lastname = result.user.lastname;
          this.birthDate = result.user.birthDate.year + "/" +
            result.user.birthDate.month + "/" +
            result.user.birthDate.day;
        }

        this.gender = result.user.gender;
      })
  }

  // Button saves changes from users profile
  onSaveChanges() {
    this.authShared.updateUserProfile()
      .subscribe(data => {
        if (!data.success) {
          console.log(data);
          this.message = data.message;
          this.messageClass = 'alert alert-danger'
        } else {
          this.getUserProfile();
          this.message = data.message;
          this.messageClass = 'alert alert-success'

        }
      })
  }

}
