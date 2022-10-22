import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WinRefService } from '../../win-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(
    private DocumentService: DocumentService,
    private winRefService: WinRefService,
    private router: Router,
    private route: ActivatedRoute)  {
      this.nativeWindow = winRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id']
          this.document = this.DocumentService.getDocument(this.id)
        }
      )

  }

  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
      
    }
  }

  onDelete() {
    this.DocumentService.deleteDocument(this.document);
    this.router.navigate(['documents'], {relativeTo: this.route});
  }

}
