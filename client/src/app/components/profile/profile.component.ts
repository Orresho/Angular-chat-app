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
  user; 

  constructor(
    private authShared: AuthShared
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.authShared.getProfile()
      .subscribe(result => {
        this.user = result.user;
        console.log(result.user);
      })
  }

}
