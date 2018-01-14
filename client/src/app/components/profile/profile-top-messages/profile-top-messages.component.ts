import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-top-messages',
  templateUrl: './profile-top-messages.component.html',
  styleUrls: ['./profile-top-messages.component.css']
})
export class ProfileTopMessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Get all messages from just the authenticated user
  getMessages(){

  }

}
