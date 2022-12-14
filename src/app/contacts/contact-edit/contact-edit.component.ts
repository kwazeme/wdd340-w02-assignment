import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from "../contacts.model";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  subscription: Subscription;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe (
      (params: Params) => {
        this.id = params['id'];
         if (this.id === null || this.id === undefined) {
          this.editMode = false;
          return;
         }
        this.originalContact = this.contactService.getContact(this.id);

        if (this.originalContact === undefined
          || this.originalContact === null) {
            return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.originalContact.group !== null ||
          this.originalContact.group !== undefined) {
          this.groupContacts = (this.contact.group);
        }
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;  // get values from form’s fields
    let newContact = new Contact(
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.groupContacts
    )
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  addToGroup($event: any){
    console.log('addmethodinit');
    const selectedContact: Contact = $event.dragData;
    // const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.isInvalidContact(selectedContact)) {
      console.log('isvalidinit');
      return;
    }
    console.log('pushinit');
    this.groupContacts.push(selectedContact);
    console.log(this.groupContacts);
  }

isInvalidContact(newContact: Contact) {
  if (!newContact) {// newContact has no value
    return true;
  }
  if (this.contact && newContact.id === this.contact.id) {
     return true;
  }
  for (let i = 0; i < this.groupContacts.length; i++){
     if (newContact.id === this.groupContacts[i].id) {
       return true;
    }
  }
  return false;
}


  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return
    }
    this.groupContacts.splice(index, 1);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
