import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
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

  constructor(
    private http: HttpClient
  ) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>(
      'https://wdd430-ng-cms-app-default-rtdb.firebaseio.com/documents.json'
    )
    .subscribe((documents: Document[]) => {
       // success method
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.documentListChangedEvent.next(this.documents.slice());
    },
    // error method
    // (error: any) => {
    //   console.log(error)
    // }
    );
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
  // this.documentListChangedEvent.next(this.documents.slice());
  this.storeDocuments();
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

  // this.documentListChangedEvent.next(this.documentListClone)
  this.storeDocuments();

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
  // this.documentListChangedEvent.next(this.documentListClone);
  this.storeDocuments();
}

storeDocuments() {
  // Convert the documents array into a string
  const documents = JSON.stringify(this.documents);
  // Create a new HttpHeaders object that sets the Content-Type of 
  // the HTTP request to application/json
  const header = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  // Call the http service’s put() method to send the document list
  this.http.put('https://wdd430-ng-cms-app-default-rtdb.firebaseio.com/documents.json', documents, {'headers': header})
        .subscribe(() => {
          this.documents.sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
          this.documentListChangedEvent.next(this.documents.slice());
         
        });
}













}
