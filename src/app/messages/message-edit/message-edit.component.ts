import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { Message } from "../message.model";
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  // currentSender = 'Kwazeme';
  @ViewChild('inputSubject') inputSubjectRef: ElementRef;
  @ViewChild('InputMsgText') InputMsgTextRef: ElementRef;
  // @Output() msgAdded = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const msgSender = this.inputSubjectRef.nativeElement.value;
    const msgText = this.InputMsgTextRef.nativeElement.value;
    const newMessage = new Message('1', msgSender, msgText, '8'); 
    // this.msgAdded.emit(newMessage);
    this.messageService.addMessage(newMessage);
    this.onClear();

  }

  onClear() {
    this.inputSubjectRef.nativeElement.value = "";
    this.InputMsgTextRef.nativeElement.value = "";

  }

}
