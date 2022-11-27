import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { Subject } from 'rxjs';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  private messages: Message[] = [];
  maxId: number;
  maxMessageId: number;
  currentId: number;
  MessageListClone: Message[];

  constructor( private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    // this.maxMessageId = this.getMaxId();
   }

  //  getMessages(): Message[] {
  //   this.http.get<Message[]>(
  //     'https://wdd430-ng-cms-app-default-rtdb.firebaseio.com/messages.json'
  //   )
  //   .subscribe((messages: Message[]) => {
  //      // success method
  //     this.messages = messages;
  //     this.maxMessageId = this.getMaxId();
  //     this.messages.sort((a, b) => {
  //       if (a < b) return -1;
  //       if (a > b) return 1;
  //       return 0;
  //     });
  //     this.messageChangedEvent.next(this.messages.slice());
  //   },
    // error method
    // (error: any) => {
    //   console.log(error)
    // }
  //   );
  //   return this.messages.slice();
  //  }

   getMessage(id: string): Message {
    for (let index = 0; index < this.messages.length; index++) {
      const message = this.messages[index];
      if (message.id === id) {

        return message;

      };
    }
    // return null;
  }

  // addMessage(newMessage: Message) {
  //   this.messages.push(newMessage);
  //   // this.messageChangedEvent.next(this.messages.slice());
  //   this.storeMessages();


  // }

  // getMaxId(): number {
  //   let maxId = 0;
  //   for (const message of this.messages) {
  //     let currentId = +(message.id);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //  return maxId
  // }

  storeMessages() {
    // Convert the messages array into a string
    const messages = JSON.stringify(this.messages);
    // Create a new HttpHeaders object that sets the Content-Type of
    // the HTTP request to application/json
    const header = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    // Call the http service’s put() method to send the document list
    this.http.put('https://wdd430-ng-cms-app-default-rtdb.firebaseio.com/messages.json', messages, {'headers': header})
          .subscribe(() => {
            this.messages.sort((a, b) => {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            });
            this.messageChangedEvent.next(this.messages.slice());

          });
  }

// MongoDB methods start


  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }

  // Add message method
  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    // make sure id of the new message is empty
    newMessage.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string; object: Message }>('http://localhost:3000/messages',
    newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData?.object);
          this.sortAndSend();
        }
      );
  }


  //


  getMessages() {
    this.http.get<{message: string; object: Message[]}>("http://localhost:3000/messages")
      .subscribe({
        next: (response) => {
          this.messages = response.object;
          // console.log(response.messages);
          // console.log(response.object);
          this.sortAndSend();
        }
      });
  }











}
