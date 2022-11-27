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
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http.get<{message: string; documents: Document[]}>("http://localhost:3000/documents")
      .subscribe({
        next: (response) => {
          this.documents = response.documents;
          // console.log(response.message);
          // console.log(response.documents);
          this.sortAndSend();
        }
      });
  }

    getDocument(id: string): Document {
      for (const document of this.documents.slice()) {
        if (document.id === id) {

          return document

        };
        // return null;
      };

    }

// deleteDocument(document: Document) {
//   if (!document) {
//      return;
//   }
//   const pos = this.documents.indexOf(document);
//   if (pos < 0) {
//      return;
//   }
//   this.documents.splice(pos, 1);
//   // this.documentListChangedEvent.next(this.documents.slice());
//   this.storeDocuments();
// }

// Delete Method for mongoDB
deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe({
      next: (res) => {
        this.documents.splice(pos, 1)
        this.sortAndSend();
      }
    });
}



// getMaxId(): number {
//   let maxId = 0;
//   for (const document of this.documents) {
//     let currentId = +(document.id);
//     if (currentId > maxId) {
//       maxId = currentId;
//     }
//   }
//  return maxId
// }

// Add document used for firebase
// addDocument(newDocument: Document) {
//   if (newDocument === null || newDocument === undefined) {
//     return;
//   }
//   this.maxDocumentId++;
//   newDocument.id =  this.maxDocumentId.toString();
//   this.documents.push(newDocument);
//   this.documentListClone = this.documents.slice();

//   // this.documentListChangedEvent.next(this.documentListClone)
//   this.storeDocuments();

// }

// Add document to mongodb
addDocument(document: Document) {
  if (!document) {
    return;
  }
  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    );
}
// // Firebase update document method
// updateDocument(originalDocument: Document, newDocument: Document) {
//   if (!originalDocument || !newDocument) {
//     return;
//   };
//   const pos = this.documents.indexOf(originalDocument);
//   if (pos < 0) {
//     return;
//   };
//   newDocument.id = originalDocument.id;
//   this.documents[pos] = newDocument;
//   this.documentListClone = this.documents.slice();
//   // this.documentListChangedEvent.next(this.documentListClone);
//   this.storeDocuments();
// }

// update document mongoDB method
updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe({
      next: (res) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    });
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
  this.http.put(
    // 'https://wdd430-ng-cms-app-default-rtdb.firebaseio.com/documents.json', documents, {'headers': header}
    'http://localhost:3000/documents', documents, {'headers': header}
    )
        .subscribe(() => {
          this.documents.sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
          this.documentListChangedEvent.next(this.documents.slice());

        });
}


sortAndSend() {
  this.documents.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  this.documentListChangedEvent.next(this.documents.slice());
}















}
