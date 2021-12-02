
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

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




  @ViewChild('imgRenderer') imgRenderer: ElementRef;
  @ViewChild('quillFile') quillFileRef: ElementRef;


  // @ViewChild('Editor', {static: false})
  // editorElementRef: ElementRef;
  // editor: any;
  fileContent: string = "";
  jsonString: string = "";

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

  constructor() { }

  ngOnInit(): void {

  }



  onInsertText() {
    const selection = this.meQuillRef.getSelection();
    this.meQuillRef.insertText(selection.index, 'ABCD');
  }

  getMeEditorInstance(editorInstance: any) {
    this.meQuillRef = editorInstance;
  }


  customImageUpload(image: any) {
    //console.log("here", image);
    /* Here we trigger a click action on the file input field, this will open a file chooser on a client computer */
    this.quillFileRef.nativeElement.click();

  }

  quillFileSelected(ev: any) {
    /* After the file is selected from the file chooser, insert the image */
    this.quillFile = ev.target.files[0];

    this.selectFile(ev);
  }



  selectFile(event: any) {
    console.log("......");
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
    //const toBeAdded = "{" + '"' + "insert" + '"' + ":{" + '"' + "image" + '"' + ":" + '"' + "data:image/jpeg;base64," + base64textString + '"' + "}}";
    let toBeAdded = "data:image/png;base64," + base64textString + '"';
    //compress image here
    const size = this.calc_image_size(base64textString)
    if (size > 400) {
      toBeAdded = this.compressImage(base64textString);
    }

    // const imageName = 'name.png';
    // const imageBlob = this.dataURItoBlob(base64textString);
    // const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    
    
    //this.fileContent = toBeAdded;

    const selection = this.meQuillRef.getSelection();
    this.meQuillRef.insertText(selection.index, toBeAdded);
    console.log(this.fileContent);
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }


  compressImage(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
    console.log("base 64 before compressed", base64Str);
    let img = new Image();
    img.src = base64Str
    let canvas = document.createElement('canvas')
    let width = img.width
    let height = img.height

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width
        width = MAX_WIDTH
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }
    }
    canvas.width = width
    canvas.height = height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)
    var newString = canvas.toDataURL()
    console.log("new string compressed", newString);
    return newString;
  }

  calc_image_size(image) {
    let y = 1;
    if (image.endsWith("==")) {
      y = 2
    }
    const x_size = (image.length * (3 / 4)) - y
    return Math.round(x_size / 1024)
  }
}
