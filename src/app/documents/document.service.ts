import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from "rxjs";

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  private documents: Document[] = [];
  maxId: number;
  currentId: number;
  maxDocumentId: number;
  documentListClone: Document[];

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

    getDocument(id: string): Document {
      for (const document of this.documents.slice()) {
        if (document.id === id) {
  
          return document
          
        };
        // return null;
      };
  
    }
 
deleteDocument(document: Document) {
  if (!document) {
     return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
     return;
  }
  this.documents.splice(pos, 1);
  this.documentListChangedEvent.next(this.documents.slice());
}

getMaxId(): number {
  let maxId = 0;
  for (const document of this.documents) {
    let currentId = +(document.id);
    if (currentId > maxId) {
      maxId = currentId;
    }
  }
 return maxId
}

addDocument(newDocument: Document) {
  if (newDocument === null || newDocument === undefined) {
    return;
  }
  this.maxDocumentId++;
  newDocument.id =  this.maxDocumentId.toString();
  this.documents.push(newDocument);
  this.documentListClone = this.documents.slice();

  this.documentListChangedEvent.next(this.documentListClone)

}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  };
  const pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return;
  };
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  this.documentListClone = this.documents.slice();
  this.documentListChangedEvent.next(this.documentListClone);
}









}
