import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Message } from "../message.model";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = 'Kwazeme';
  @ViewChild('InputMsgSender') InputMsgSenderRef: ElementRef;
  @ViewChild('InputMsgText') InputMsgTextRef: ElementRef;
  @Output() msgAdded = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const msgSender = this.InputMsgSenderRef.nativeElement.value;
    const msgText = this.InputMsgTextRef.nativeElement.value;
    const newMessage = new Message(1, msgSender, msgText, this.currentSender); 
    this.msgAdded.emit(newMessage);

  }

  onClear() {
    this.InputMsgSenderRef.nativeElement.value === "";
    this.InputMsgTextRef.nativeElement.value === "";

  }

}
