import { Component, Input, OnInit } from '@angular/core';

import { Document } from '../../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  // @Output() selectedDocument = new EventEmitter<void>();
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

//   onSelected() {
//   this.selectedDocument.emit();
// }

}




