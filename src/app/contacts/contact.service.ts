import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  contacts: Contact[];
  maxId: number;
  currentId: number;
  maxContactId: number;
  contactListClone: Contact[];

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

   getContacts(): Contact[] {
    return this.contacts.slice();
   }

  getContact(id: string): Contact {
    for (let contact of this.contacts.slice()) {
      if (contact.id === id) {

        return contact;
        
      };
      // return null;
    }

  }

  addContact(newContact: Contact) {
    if(!newContact) {
        return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListClone = this.contacts.slice();

    this.contactChangedEvent.next(this.contactListClone);
}


  deleteContact(contact: Contact) {
    if (!contact) {
      return;
  }
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) {
      return;
  }
  this.contacts.splice(pos, 1);
  this.contactChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;
    }
    const pos = this.contacts.indexOf(originalContact);
    newContact[pos] = newContact;
    this.contactListClone = this.contacts.slice();
    this.contactChangedEvent.next(this.contactListClone);
}



  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      let currentId = +(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
   return maxId
  }








  }



