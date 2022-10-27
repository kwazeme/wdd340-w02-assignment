import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from "../contacts.model";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  
  contactList: Contact[];
  private contactListChange: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactList = this.contactService.getContacts();
    this.contactListChange = this.contactService.contactChangedEvent
      .subscribe(
        (contact: Contact[]) => {
          this.contactList = contact;
        })
  }
 
  ngOnDestroy(): void {
    this.contactListChange
      .unsubscribe();
  }

}
