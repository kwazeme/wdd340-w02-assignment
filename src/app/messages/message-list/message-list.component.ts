import { Component, OnInit } from '@angular/core';

import { Message } from "../message.model";
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  // @Output() contactList = new EventEmitter<Message>();
  messages: Message[] = [];
  //   new Message('3', 'Brother Clement', 'This is a test message','Bro Bernice'),
  //   new Message('4', 'Brother Jackson', 'Thomas says he is good','Bro Clem'),
  //   new Message('5', 'Brother James', 'This is my message','Bro Augustine'),
  //   new Message('6', 'Brother Peter', 'This can be your too','Bro Kwazeme'),
  // ];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessages();
    this.messageService.messageChangedEvent
    .subscribe(
      (messages:Message[]) => {
        this.messages = messages;
      }
    )
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
