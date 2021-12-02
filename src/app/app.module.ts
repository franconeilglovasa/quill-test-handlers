import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillTest1Component } from './quill/quill-test1/quill-test1.component';
import { QuillTest2Component } from './quill/quill-test2/quill-test2.component';

@NgModule({
  declarations: [
    AppComponent,
    QuillTest1Component,
    QuillTest2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
