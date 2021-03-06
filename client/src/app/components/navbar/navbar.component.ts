import { MessagesService } from './../../_services/messages/messages.service';
import { AuthLogService } from './../../_services/authentication/auth-log.service';
import { Router } from '@angular/router';
import { AuthShared } from './../../_services/authentication/auth-shared.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // The alert properties
  message: string;
  messageClass: string;

  constructor(
    private authShared: AuthShared,
    private authLogService: AuthLogService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private messagesService: MessagesService
  ) { }


  ngOnInit() {

  }

  onLogout() {

    // Call logout service
    this.authShared.logout();

    // Display messages
    this.flashMessagesService.show('You are getting logged out', { cssClass: 'alert-info' });

    // Redirect after x miliseconds
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);

  }

}
