import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    // new Document(1, 'CSE341: Web Backend Developement II', 'designed to provide students with real-world learning opportunities. In any given lesson, there will be several suggested resources provided to you, but none of them are intended to be comprehensive in nature.','https://cse341.netlify.app/lesson8', 'null' ),
    // new Document(2, 'WDD430: Full Stack Web Developement', 'This course will teach students how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack','https://cse341.netlify.app/lesson8', 'null' ),
    // new Document(3, 'WDD330: Web Frontend Developement II', 'This course is designed to give students the skills required to create web applications using HTML, CSS , and Javascript. It is intended to help the student learn to do this without the aid of third-party frameworks or libraries.','https://cse341.netlify.app/lesson8', 'null' ),
    // new Document(4, 'CIT220: Database Design & Developement', 'The course deals with concepts and principles of database theory, application, and management technologies. It focuses on the logical and physical database design and implementation.','https://cse341.netlify.app/lesson8', 'null' ),
    // new Document(5, 'BUS301: Advanced Writing in Pro Contexts', 'Advanced Writing in Professional Contexts introduces you to the fundamentals of rhetorical principles and writing practices using a number of typical business situations','https://byui.instructure.com/courses/191236/modules', 'null' ),
    // new Document(6, 'CSE121B: JavaScript Language', 'In this course you will see how the principles of programming you learned in CSE 110 and 111 are used to solve problems in your discipline. To that end, all of your assignments in this class will come from your major discipline','https://byui-cse.github.io/cse121b-course/syllabus.html', 'null' ),
    // new Document(7, 'WDD130: Web Fundamentals', 'Web design and development principles. The course uses hands-on activities with students actually participating in simple Web design projects and programming','https://byui.instructure.com/courses/160482/assignments/syllabus', 'null' ),
    // new Document(8, 'WDD230: Web Frontend I', 'This course focuses on contemporary front-end web design and development technologies and the application of those technologies in building web sites. When planning, designing, and developing websites and applications, successful web developers','https://byui.instructure.com/courses/174366/pages/wdd-230-syllabus', 'null' )
  ];
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
    this.documentService.documentChangedEvent
    .subscribe(
        (document:Document[]) => {
          this.documents = document;
        })   
  }

  // onSelectedDocument(document: Document) {
  //   // this.selectedDocumentEvent.emit(document);
  //   this.documentService.documentSelectedEvent.emit(document);
  // }

 


}


