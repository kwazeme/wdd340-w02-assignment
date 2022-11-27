import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  subscription: Subscription;


  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.params
      .subscribe (
      (params: Params) => {
        let id = params['id'];
         if (id === null || id === undefined) {
          return this.editMode = false;
         }
        this.originalDocument = this.documentService.getDocument(id);

        if (this.originalDocument === undefined
          || this.originalDocument === null) {
            return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));

    })
  }


  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm){
    let value = form.value;  // get values from form’s fields
    let newDocument = new Document(
      value.name,
      value.description,
      value.url,
    )
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument)
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }



}
