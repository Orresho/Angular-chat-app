import { MessagesService } from './../../_services/messages/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  myForm: FormGroup;

  // Messages from two users
  recipientName: string;
  recipientMessage: string;

  senderName: string;
  senderMessage: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
   ) {
    
      // Create form
      this.createForm();    
  }

  ngOnInit() {
  }


  // Function to create the form
  createForm() {
    this.myForm = this.formBuilder.group({
      content: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ])],
    });
  }


  onMessageSubmit(){

    // Message and sender name
    this.senderMessage = this.myForm.get('content').value;
    this.senderName = JSON.parse(localStorage.getItem("user"));

    const message = {
      content: this.myForm.get('content').value,
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token')
    }  

    this.messagesService.saveMessages(message)
      .subscribe(data => {
        
      })

    console.log(message);
    this.myForm.reset();
    
  }

}
