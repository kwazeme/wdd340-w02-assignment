import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();

  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
    return this.contacts.slice();
   }

  // getContact(id: string): Contact {
  
  //   this.contacts.forEach(contact => {
  //     if (contact.id = id) {
  //       return  contact;
  //     }
      
  //   });
  //   return null
  // }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id = id) {

        return contact
        
      };
      return null;
    }

  }




}
