import { AuthShared } from './../../../_services/authentication/auth-shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  // Global properties
  username: string = '';
  email: string = ''; 
  firstname: string = '';
  lastname: string = '';
  birthDate: string = '';
  gender: string = '';

  // Id to pass as params
  id: string;

  constructor(
    private authShared: AuthShared
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.authShared.getProfile()
      .subscribe(result => {

        // Save information to global props
        this.username = result.user.username;
        this.email = result.user.email;
        this.firstname = result.user.firstname;
        this.lastname = result.user.lastname;
        this.birthDate = result.user.birthDate.year + "/" +
          result.user.birthDate.month + "/" +
          result.user.birthDate.day;
        this.gender = result.user.gender;

        // Save the users id
        this.id = result.user._id;

        console.log(result.user);
      })
  }
}
