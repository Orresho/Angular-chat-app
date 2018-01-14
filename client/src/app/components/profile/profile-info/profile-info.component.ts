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

  constructor(
    private authShared: AuthShared
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.authShared.getProfile()
      .subscribe(result => {

        this.username = result.user.username;
        this.email = result.user.email;

        console.log(result.user);
      })
  }
}
