import { Component, Input, OnInit} from '@angular/core';

import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  // @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  // onSelected() {
  //   this.contactSelected.emit();
  // }

}
