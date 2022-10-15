import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from "../contacts.model";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // @Output() contactWasSelected = new EventEmitter<Contact>();
  contacts: Contact[] = [
    // new Contact('1', 'R. Kent Jackson','kent@byui.edu','phone: 208-496-3771','/assets/images/jacksonk.jpg', null ),
    // new Contact('2', 'Rex Barzee','rbarzee@byui.edu','208-496-3768','/assets/images/barzeer.jpg', null)
  ];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }
  onContactSelected(contact: Contact) {
    // this.contactWasSelected.emit(contact);
    this.contactService.contactSelectedEvent.emit(contact);
  }

}
