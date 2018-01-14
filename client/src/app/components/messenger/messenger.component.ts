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

  // Message content
  messages: string;

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) {

    // Create form
    this.createForm();
  }

  ngOnInit() {
    this.loadAllMessages();
  }

  // Get all messages
  loadAllMessages() {
    this.messagesService.getAllMessages()
      .subscribe(data => {
        this.messages = data.data;
        console.log(data.data)
      })
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


  onMessageSubmit() {

    const message = {
      content: this.myForm.get('content').value,
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token')
    }

    this.messagesService.saveMessages(message)
      .subscribe(data => {
        if (!data) {
          console.log(data.message);
        }
        this.loadAllMessages();
    })

    this.myForm.reset();

  }

}
