import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from "../contacts.model";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(1, 'R. Kent Jackson','phone: 208-496-3771','/assets/images/jacksonk.jpg', 'kent@byui.edu'),
    new Contact(2, 'Rex Barzee','208-496-3768','/assets/images/barzeer.jpg', 'rbarzee@byui.edu')
  ];

  constructor() { }

  ngOnInit(): void {
  }
  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }

}
