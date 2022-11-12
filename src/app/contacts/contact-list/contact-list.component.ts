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
  
  contacts: Contact[] = [];
  private contactListChange: Subscription;
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactListChange = this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        })
  }

  search(value: string) {
    this.term = value;
  }
 
  ngOnDestroy(): void {
    this.contactListChange
      .unsubscribe();
  }

}
