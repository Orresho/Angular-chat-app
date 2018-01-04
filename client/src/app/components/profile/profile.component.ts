import { AuthShared } from './../../_services/authentication/auth-shared.service';
import { AuthLogService } from './../../_services/authentication/auth-log.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  // Global properties
  username;
  email; 

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
