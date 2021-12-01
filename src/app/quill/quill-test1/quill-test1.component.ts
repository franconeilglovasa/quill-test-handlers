
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';


Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-quill-test1',
  templateUrl: './quill-test1.component.html',
  styleUrls: ['./quill-test1.component.scss']
})
export class QuillTest1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  @ViewChild('imgRenderer') imgRenderer: ElementRef;
  @ViewChild('quillFile') quillFileRef: ElementRef;

  quillFile: any;
  meQuillRef: any;
  editorModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image']
      ],
      handlers: {
        image: (image) => {
          this.customImageUpload(image);
        }
      }
    },
    imageResize: true,
  };

  getMeEditorInstance(editorInstance: any) {
    this.meQuillRef = editorInstance;
  }


  customImageUpload(image: any) {
    //console.log("here", image);
    /* Here we trigger a click action on the file input field, this will open a file chooser on a client computer */
    this.quillFileRef.nativeElement.click();
    
  }

  quillFileSelected(ev: any) {
    /* After the file is selected from the file chooser, we handle the upload process */
    this.quillFile = ev.target.files[0];

    this.selectFile(ev);
    //console.log(ev.target.files[0]);
   
    //  const imageData = {
    //    id: this.article != null && this.article !== undefined ? this.article.post_id : null,
    //    title: this.quillFile.name,
    //    file: this.quillFile
    //  };


  }

  selectFile(event:any) {
    console.log ("......");
    //console.log ("here.......",event);
    var files = event.target.files;
    var file = files[0];

    

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this.handleFile.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  handleFile(event) {
    var binaryString = event.target.result;
    let base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }



}
