import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

    // getDocument(id: string): Document[] {
    //   this.documents.forEach(element => {
        
    //   });
    // }

    getDocument(id: string): Document {
      this.documents.forEach(document => {
        if (document.id = id) {
          return document;
        }
      });
      return null;
    }
}
