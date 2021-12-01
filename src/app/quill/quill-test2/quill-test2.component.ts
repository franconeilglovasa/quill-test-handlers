import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quill-test2',
  templateUrl: './quill-test2.component.html',
  styleUrls: ['./quill-test2.component.scss']
})
export class QuillTest2Component implements OnInit {
  @ViewChild('quillFile') quillFileRef: ElementRef;

  quillFile: any;
  meQuillRef: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  getEditorInstance(editorInstance:any) {
    console.log(editorInstance)
    let toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', (image) => {
      this.customImageUpload(image);
    });
  }

  customImageUpload(image: any) {
    console.log("here", image);
    /* Here we trigger a click action on the file input field, this will open a file chooser on a client computer */
    this.quillFileRef.nativeElement.click();
  }

  quillFileSelected(ev: any) {
    /* After the file is selected from the file chooser, we handle the upload process */
     this.quillFile = ev.target.files[0];
     console.log(ev.target.files[0]);
    //  const imageData = {
    //    id: this.article != null && this.article !== undefined ? this.article.post_id : null,
    //    title: this.quillFile.name,
    //    file: this.quillFile
    //  };
   
   
 }

}
