import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from "../contacts.model";

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(
    private contactService: ContactService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      )
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.route.navigate(['contacts']);
  }
}
