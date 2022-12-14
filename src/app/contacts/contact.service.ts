import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contacts.model';

// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxId: number;
  currentId: number;
  maxContactId: number;
  contactListClone: Contact[];

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
   }

  //  getContacts(): Contact[] {
  //   this.http.get<Contact[]>(
  //     'https://wdd430-ng-cms-app-default-rtdb.firebaseio.com/contacts.json'
  //   )
  //   .subscribe((contacts: Contact[]) => {
  //      // success method
  //     this.contacts = contacts;
  //     this.maxContactId = this.getMaxId();
  //     this.contacts.sort((a, b) => {
  //       if (a < b) return -1;
  //       if (a > b) return 1;
  //       return 0;
  //     });
  //     this.contactChangedEvent.next(this.contacts.slice());
  //   },
    // error method
    // (error: any) => {
    //   console.log(error)
    // }
  //   );
  //   return this.contacts.slice();
  //  }

  getContact(id: string): Contact {
    // console.log('init')
    for (const contact of this.contacts.slice()) {
      // console.log('init')
      if (contact.id === id) {
          return contact;
      }
  }
  // return null;

  }

//   addContact(newContact: Contact) {
//     if(!newContact) {
//         return;
//     }
//     this.maxContactId++;
//     newContact.id = this.maxContactId.toString();
//     this.contacts.push(newContact);
//     this.contactListClone = this.contacts.slice();

//     // this.contactChangedEvent.next(this.contactListClone);
//     this.storeContacts();
// }


  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  // }
  // const pos = this.contacts.indexOf(contact);
  // if (pos < 0) {
  //     return;
  // }
  // this.contacts.splice(pos, 1);
  // // this.contactChangedEvent.next(this.contacts.slice());
  // this.storeContacts();
  // }

//   updateContact(originalContact: Contact, newContact: Contact) {
//     if (!originalContact || !newContact) {
//         return;
//     }
//     const pos = this.contacts.indexOf(originalContact);
//     if (pos < 0) {
//     return;
//     };
//     // const pos = this.contacts.indexOf(originalContact);
//     newContact.id = originalContact.id;
//     this.contacts[pos] = newContact;
//     this.contactListClone = this.contacts.slice();
//     // this.contactChangedEvent.next(this.contactListClone);
//     this.storeContacts();
// }



  // getMaxId(): number {
  //   let maxId = 0;
  //   for (const contact of this.contacts) {
  //     let currentId = +(contact.id);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //  return maxId
  // }

  storeContacts() {
    // Convert the contacts array into a string
    const contacts = JSON.stringify(this.contacts);
    // Create a new HttpHeaders object that sets the Content-Type of
    // the HTTP request to application/json
    const header = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    // Call the http service???s put() method to send the document list
    this.http.put('https://wdd430-ng-cms-app-default-rtdb.firebaseio.com/contacts.json', contacts, {'headers': header})
          .subscribe(() => {
            this.contacts.sort((a, b) => {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            });
            this.contactChangedEvent.next(this.contacts.slice());

          });

  }
// MongoDB Methods

// Fetch contacts method

getContacts() {
  this.http.get<{message: string; contacts: Contact[]}>("http://localhost:3000/contacts")
    .subscribe({
      next: (response) => {
        this.contacts = response.contacts;
        console.log(response.message);
        console.log(response.contacts);
        this.sortAndSend();
      }
    });
}



// Add contact to mongodb
addContact(contact: Contact): void {
  if (!contact) {
    return;
  }
  // make sure id of the new newContact is empty
  contact.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    contact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      }
    );
}

// PUT method for mongoDB
updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === originalContact.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newContact.id = originalContact.id;
  newContact._id = originalContact._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
    .subscribe({
      next: (res) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
    });
}


// Delete Method for mongoDB
deleteContact(contact: Contact) {

  if (!contact) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === contact.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/contacts/' + contact.id)
    .subscribe({
      next: (res) => {
        this.contacts.splice(pos, 1)
        this.sortAndSend();
      }
    });
}


  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.contactChangedEvent.next(this.contacts.slice());
  }


}
