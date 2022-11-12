import { Component, Input, OnInit } from '@angular/core';

import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contacts.model';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  contact: Contact[] = [];
  randomSender = ["Rex Barzee","Bradley Armstrong","Craig Lindstrom","Michael McLaughlin","Brent Morring","Kwazeme"]

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const  contact: Contact = this.contactService.getContact(this.message.sender);
  if (contact) {
    this.messageSender = contact?.name;
  }
   else {this.messageSender = this.randomSender[Math.floor(Math.random()*this.randomSender.length)];}

    

    // this.contactService.getContact(this.message.sender)
    //     .subscribe(contact => this.contactService = arg);
      
  }




}
