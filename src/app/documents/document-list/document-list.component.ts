import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  documents: Document[];
  documentId: string = '';

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.documents = this.documentService.getDocuments();
   }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
        (documents:Document[]) => {
          this.documents = documents;
        });
  }

  // onSelectedDocument(document: Document) {
  //   // this.selectedDocumentEvent.emit(document);
  //   this.documentService.documentSelectedEvent.emit(document);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}
