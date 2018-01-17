import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUrl;

  constructor(
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.getUserById();
  }

  // Get single user with id
  getUserById(){
    this.currentUrl = this.activatedRoute.snapshot.params;
    console.log(this.currentUrl.id);
  }


}
