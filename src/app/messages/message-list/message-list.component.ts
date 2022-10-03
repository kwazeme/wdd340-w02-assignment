import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Message } from "../message.model";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() contactList = new EventEmitter<Message>();
  messages: Message[] = [
    new Message(3, 'Brother Clement', 'This is a test message','Bro Bernice'),
    new Message(4, 'Brother Jackson', 'Thomas says he is good','Bro Clem'),
    new Message(5, 'Brother James', 'This is my message','Bro Augustine'),
    new Message(6, 'Brother Peter', 'This can be your too','Bro Kwazeme'),
  ]

  constructor() { }

  ngOnInit(): void {
  }
  onAddMessage(message: Message) {
    this.contactList.emit(message);
  }

}
